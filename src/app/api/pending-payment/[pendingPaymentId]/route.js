import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import PendingPayments from "@/models/PendingPayments";

export async function GET(request, { params }) {
    await dbConnect();
    const { pendingPaymentId } = params;
  
    try {
      const pendingPayment = await PendingPayments.findById(pendingPaymentId).populate({
        path: 'membershipId',
        populate: [
          { path: 'memberId' },
          { path: 'groupId' }
        ]
      });
  
      if (!pendingPayment) {
        return NextResponse.json({ error: "Payment not found" }, { status: 404 });
      }
  
      if (pendingPayment.expiresAt < new Date()) {
        return NextResponse.json({ error: "Payment link expired" }, { status: 400 });
      }
  
      return NextResponse.json({
        amount: pendingPayment.amount,
        member: pendingPayment.membershipId.memberId,
        groupName: pendingPayment.membershipId.groupId.groupName,
      });
    } catch (error) {
      console.error("Error fetching payment details:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }