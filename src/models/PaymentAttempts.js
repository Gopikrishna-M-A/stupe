import mongoose from 'mongoose';
import PendingPayments from './PendingPayments';

const PaymentAttemptSchema = new mongoose.Schema({
    pendingPaymentId: { type: mongoose.Schema.Types.ObjectId, ref: PendingPayments, required: true },
    razorpayOrderId: { type: String, required: true },
    status: { type: String, enum: ['created', 'attempted', 'failed'], default: 'created' },
}, { timestamps: true });

export default mongoose.models.PaymentAttempt || mongoose.model('PaymentAttempt', PaymentAttemptSchema);