import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Member from "@/models/Member";
import Memberships from "@/models/Memberships";
import Group from "@/models/Group";

export async function GET(request, { params }) {
  await dbConnect();
  const { memberId } = params;

  try {
    const member = await Member.findById(memberId);
    if (!member) {
      return NextResponse.json({ error: "Member not found" }, { status: 404 });
    }

    const membership = await Memberships.findOne({ memberId });
    if (!membership) {
      return NextResponse.json({ error: "Membership not found" }, { status: 404 });
    }

    const group = await Group.findById(membership.groupId);
    if (!group) {
      return NextResponse.json({ error: "Group not found" }, { status: 404 });
    }

    return NextResponse.json({ member, membership, group });
  } catch (error) {
    console.error("Error fetching member data:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}