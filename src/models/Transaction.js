import mongoose from 'mongoose';
import Member from './Member';
import Group from './Group';
import Memberships from './Memberships';
import Institute from './Institute';

const TransactionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  transactionDate: { type: Date, required: true },
  memberId: { type: mongoose.Schema.Types.ObjectId, ref: Member, required: true },
  groupId: { type: mongoose.Schema.Types.ObjectId, ref: Group, required: true },
  instituteId: { type: mongoose.Schema.Types.ObjectId, ref: Institute, required: true },
  membershipId: { type: mongoose.Schema.Types.ObjectId, ref: Memberships, required: true },
  status: { type: String, required: true, enum: ['Pending', 'Completed', 'Failed'] },
  paymentId: { type: String },
  paymentMethod: { type: String },
}, { timestamps: true });

export default mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);