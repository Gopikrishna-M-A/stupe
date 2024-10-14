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

async function sendReminderEmail(member, group, paymentLink) {
  await resend.emails.send({
    from: "pay@stupe.co",
    to: member.email,
    subject: `Fee Reminder for ${group.groupName}`,
    html: `
      <h1>Fee Reminder</h1>
      <p>Dear ${member.name},</p>
      <p>This is a reminder to pay your fees for ${group.groupName}.</p>
      <p>Please click the link below to make your payment:</p>
      <a href="${paymentLink}">Pay Now</a>
      <p>If you have any questions, please contact us.</p>
      <p>Thank you!</p>
    `,
  });
}