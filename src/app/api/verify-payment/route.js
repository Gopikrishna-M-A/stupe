import { NextResponse } from "next/server";
import crypto from "crypto";
import dbConnect from "@/lib/mongodb";
import Transaction from "@/models/Transaction";
import Memberships from "@/models/Memberships";
import Group from "@/models/Group";
import Razorpay from "razorpay";

export async function POST(request) {
  await dbConnect();
  const {
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    memberId,
    groupId,
    membershipId,
  } = await request.json();

  const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
  shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = shasum.digest("hex");

  if (digest !== razorpay_signature) {
    return NextResponse.json({ error: "Transaction not legit!" }, { status: 400 });
  }

  try {
    // Initialize Razorpay instance
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    // Fetch payment details from Razorpay
    const paymentDetails = await razorpay.payments.fetch(razorpay_payment_id);

    // Extract the actual payment method
    const paymentMethod = paymentDetails.method;

    // Update transaction
    const transaction = await Transaction.findOneAndUpdate(
      { paymentId: razorpay_order_id },
      {
        status: "Completed",
        paymentId: razorpay_payment_id,
        paymentMethod: paymentMethod,
      },
      { new: true }
    );

    // Update membership status
    await Memberships.findByIdAndUpdate(membershipId, { feeStatus: "Paid" });

    // Update group's collected fees
    await Group.findByIdAndUpdate(groupId, {
      $inc: { collectedFees: transaction.amount },
    });

    return NextResponse.json({ message: "Payment verified successfully", paymentMethod: paymentMethod });
  } catch (error) {
    console.error("Error verifying payment:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}