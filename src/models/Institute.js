import mongoose from 'mongoose';

const InstituteSchema = new mongoose.Schema({
  ownerName:{ type: String, required: true },
  emailId: { 
    type: String, 
    required: true, 
    unique: true, 
  },
  phoneNumber: { type: String, required: true, unique: true },
  instituteName: { type: String, required: true },
  address: String,
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },

}, { timestamps: true });

export default mongoose.models.Institute || mongoose.model('Institute', InstituteSchema);