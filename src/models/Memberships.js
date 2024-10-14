import mongoose from "mongoose";

const MembershipsSchema = new mongoose.Schema(
  {
    memberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: true,
    },
    feeAmount: { type: Number, required: true },
    feeStatus: {
      type: String,
      enum: ["Paid", "Partial", "Pending"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Memberships || mongoose.model("Memberships", MembershipsSchema);
