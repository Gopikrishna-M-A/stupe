import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import dbConnect from "@/lib/mongodb";
import Transaction from "@/models/Transaction";
import Group from "@/models/Group";
import PendingPayments from "@/models/PendingPayments";
import PaymentAttempts from "@/models/PaymentAttempts";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});


export async function POST(request) {
  await dbConnect();
  const { pendingPaymentId } = await request.json();

  try {
    const pendingPayment = await PendingPayments.findById(pendingPaymentId);

    if (!pendingPayment) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    }

    if (pendingPayment.expiresAt < new Date()) {
      return NextResponse.json({ error: "Payment link expired" }, { status: 400 });
    }

    const order = await razorpay.orders.create({
      amount: pendingPayment.amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    const paymentAttempt = new PaymentAttempts({
      pendingPaymentId: pendingPayment._id,
      razorpayOrderId: order.id,
    });
    await paymentAttempt.save();

    return NextResponse.json(order);
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}