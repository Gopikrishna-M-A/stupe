import { NextResponse } from "next/server";
import { Resend } from "resend";
import dbConnect from "@/lib/mongodb";
import Group from "@/models/Group";
import Memberships from "@/models/Memberships";
import Member from "@/models/Member";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  await dbConnect();
  const { groupId } = await request.json();

  try {
    const group = await Group.findById(groupId);
    if (!group) {
      return NextResponse.json({ error: "Group not found" }, { status: 404 });
    }

    const memberships = await Memberships.find({ groupId, feeStatus: { $ne: "Paid" } }).populate("memberId");

    const remindersSent = await Promise.all(
      memberships.map(async (membership) => {
        const member = membership.memberId;
        const paymentLink = `${process.env.NEXT_PUBLIC_BASE_URL}/pay/${member._id}`;
        await sendReminderEmail(member, group, paymentLink);
        return { memberId: member._id, email: member.email };
      })
    );

    return NextResponse.json({ message: "Reminders sent successfully", remindersSent });
  } catch (error) {
    console.error("Error sending reminders:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// async function sendReminderEmail(member, group, paymentLink) {
//   await resend.emails.send({
//     from: "pay@stupe.co",
//     to: member.email,
//     subject: `Fee Reminder for ${group.groupName}`,
//     html: `
//       <h1>Fee Reminder</h1>
//       <p>Dear ${member.name},</p>
//       <p>This is a reminder to pay your fees for ${group.groupName}.</p>
//       <p>Please click the link below to make your payment:</p>
//       <a href="${paymentLink}">Pay Now</a>
//       <p>If you have any questions, please contact us.</p>
//       <p>Thank you!</p>
//     `,
//   });
// }

async function sendReminderEmail(member, group, paymentLink) {
  await resend.emails.send({
    from: "pay@stupe.co",
    to: member.email,
    subject: `Fee Reminder for ${group.groupName}`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Fee Reminder</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f8f8; padding: 20px;">
              <tr>
                  <td align="center">
                      <img src="https://ecomm-project-bucket.s3.ap-southeast-2.amazonaws.com/1.png" alt="Stupe Logo" style="max-width: 200px; height: auto;" />
                  </td>
              </tr>
          </table>
          
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #ffffff; padding: 30px; border-radius: 5px; margin-top: 20px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
              <tr>
                  <td>
                      <h1 style="color: #005180; margin-bottom: 20px;">Fee Reminder</h1>
                      <p style="margin-bottom: 15px;">Dear ${member.name},</p>
                      <p style="margin-bottom: 15px;">This is a friendly reminder to pay your fees for ${group.groupName}.</p>
                      <p style="margin-bottom: 20px;">Please click the button below to make your payment:</p>
                      <table cellpadding="0" cellspacing="0">
                          <tr>
                              <td align="center" style="background-color: #005180; border-radius: 5px;">
                                  <a href="${paymentLink}" style="display: inline-block; padding: 12px 24px; color: #ffffff; text-decoration: none; font-weight: bold;">Pay Now</a>
                              </td>
                          </tr>
                      </table>
                      <p style="margin-top: 20px;">If you have any questions, please don't hesitate to contact us.</p>
                      <p>Thank you for your prompt attention to this matter.</p>
                  </td>
              </tr>
          </table>
          
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 20px; text-align: center; color: #666666; font-size: 12px;">
              <tr>
                  <td>
                      <p>&copy; ${new Date().getFullYear()} Stupe. All rights reserved.</p>
                  </td>
              </tr>
          </table>
      </body>
      </html>
    `,
  });
}