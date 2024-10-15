import mongoose from "mongoose";
import Member from "./Member";
import Group from "./Group";

const MembershipsSchema = new mongoose.Schema(
  {
    memberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Member,
      required: true,
    },
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Group,
      required: true,
    },
    feeAmount: { type: Number, required: true },
    feeStatus: {
      type: String,
      enum: ["Paid", "Partial", "Pending"],
      default: "Pending",
    },
    lastPaidDate: { type: Date }
  },
  { timestamps: true }
);

export default mongoose.models.Memberships || mongoose.model("Memberships", MembershipsSchema);
