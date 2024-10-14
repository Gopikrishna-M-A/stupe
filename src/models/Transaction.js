import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  transactionDate: { type: Date, required: true },
  memberId: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },
  groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
  membershipId: { type: mongoose.Schema.Types.ObjectId, ref: 'Memberships', required: true },
  status: { type: String, required: true, enum: ['Pending', 'Completed', 'Failed'] },
  paymentId: { type: String },
  paymentMethod: { type: String },
}, { timestamps: true });

export default mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);