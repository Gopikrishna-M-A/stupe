import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import dbConnect from "@/lib/mongodb";
import Transaction from "@/models/Transaction";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(request) {
  await dbConnect();
  const { memberId, groupId, membershipId, amount } = await request.json();

  try {
    const order = await razorpay.orders.create({
      amount: amount * 100, // Razorpay expects amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    // Create a pending transaction
    await Transaction.create({
      amount,
      transactionDate: new Date(),
      memberId,
      groupId,
      membershipId,
      status: "Pending",
      paymentId: order.id,
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}