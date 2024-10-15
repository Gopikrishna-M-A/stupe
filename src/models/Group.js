import mongoose from "mongoose";
import Institute from "./Institute";

const GroupSchema = new mongoose.Schema(
  {
    groupName: { type: String, required: true },
    description: { type: String, required: false },
    totalFees: { type: Number, default: 0 },
    collectedFees: { type: Number, default: 0 },
    institute: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Institute,
      required: true,
    },
    feeCollectionInterval: { type: Number, default: 30 },
  },
  { timestamps: true }
);

export default mongoose.models.Group || mongoose.model("Group", GroupSchema);
