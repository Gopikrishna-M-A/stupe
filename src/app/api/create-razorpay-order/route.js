import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import dbConnect from "@/lib/mongodb";
import Transaction from "@/models/Transaction";
import Group from "@/models/Group";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(request) {
  await dbConnect();
  const { memberId, groupId, membershipId, amount } = await request.json();

  try {
    const group = await Group.findById(groupId);
    if (!group) {
      return NextResponse.json({ error: "Group not found" }, { status: 404 });
    }

    const instituteId = group.institute;

    const order = await razorpay.orders.create({
      amount: amount * 100, 
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    const newTransaction = new Transaction({
      amount,
      transactionDate: new Date(),
      memberId,
      groupId,
      instituteId, 
      membershipId,
      status: "Pending",
      paymentId: order.id,
    });

    await newTransaction.save();

    return NextResponse.json(order);
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}