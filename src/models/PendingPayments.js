
import mongoose from 'mongoose';
import Memberships from './Memberships';

const PendingPaymentSchema = new mongoose.Schema({
    membershipId: { type: mongoose.Schema.Types.ObjectId, ref: Memberships, required: true },
    amount: { type: Number, required: true },
    expiresAt: { type: Date, required: true },
}, { timestamps: true });

export default mongoose.models.PendingPayment || mongoose.model('PendingPayment', PendingPaymentSchema);