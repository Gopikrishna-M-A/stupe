import mongoose from "mongoose";

const GroupSchema = new mongoose.Schema(
  {
    groupName: { type: String, required: true },
    description: { type: String, required: false },
    totalFees: { type: Number, default: 0 },
    collectedFees: { type: Number, default: 0 },
    institute: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institute",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Group || mongoose.model("Group", GroupSchema);
