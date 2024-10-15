import { NextResponse } from "next/server";
import crypto from "crypto";
import dbConnect from "@/lib/mongodb";
import Transaction from "@/models/Transaction";
import Memberships from "@/models/Memberships";
import Group from "@/models/Group";
import Razorpay from "razorpay";
import PaymentAttempts from "@/models/PaymentAttempts";
import PendingPayments from "@/models/PendingPayments";

export async function POST(request) {
  await dbConnect();
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = await request.json();

  try {
    const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
    shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = shasum.digest("hex");

    if (digest !== razorpay_signature) {
      return NextResponse.json({ error: "Transaction not legit!" }, { status: 400 });
    }

    const paymentAttempt = await PaymentAttempts.findOne({ razorpayOrderId: razorpay_order_id }).populate('pendingPaymentId');
    if (!paymentAttempt) {
      return NextResponse.json({ error: "Payment attempt not found" }, { status: 404 });
    }

    const pendingPayment = paymentAttempt.pendingPaymentId;
    const membership = await Memberships.findById(pendingPayment.membershipId);

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    

    const paymentDetails = await razorpay.payments.fetch(razorpay_payment_id);

    const transaction = new Transaction({
      amount: pendingPayment.amount,
      transactionDate: new Date(),
      memberId: membership.memberId,
      groupId: membership.groupId,
      instituteId: (await Group.findById(membership.groupId)).institute,
      membershipId: membership._id,
      status: "Completed",
      paymentId: razorpay_payment_id,
      paymentMethod: paymentDetails.method,
    });
    await transaction.save();

    const updatedMembership = await Memberships.findByIdAndUpdate(
      membership._id,
      {
        $set: {
          lastPaidDate: new Date(),
          feeStatus: "Paid"
        }
      },
      { new: true }
    );

    if (!updatedMembership) {
      return NextResponse.json({ error: "Membership not found" }, { status: 404 });
    }
    await Group.findByIdAndUpdate(membership.groupId, { $inc: { collectedFees: pendingPayment.amount } });
    await PendingPayments.findByIdAndDelete(pendingPayment._id);
    await PaymentAttempts.findByIdAndDelete(paymentAttempt._id);

    return NextResponse.json({ message: "Payment verified successfully" });
  } catch (error) {
    console.error("Error verifying payment:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
