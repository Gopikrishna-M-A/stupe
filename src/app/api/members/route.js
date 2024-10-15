import dbConnect from "@/lib/mongodb"
import Group from "@/models/Group"
import Member from "@/models/Member"
import Memberships from "@/models/Memberships"
import { NextResponse } from "next/server"

export async function GET(request) {
  await dbConnect()
  const { searchParams } = new URL(request.url)
  const groupId = searchParams.get("groupId")
  const instituteId = searchParams.get("instituteId")

  try {
    let memberships

    if (groupId) {
      // If groupId is provided, fetch members of that specific group
      memberships = await Memberships.find({ groupId })
        .populate("memberId")
        .populate("groupId")
    } else if (instituteId) {
      // If instituteId is provided, fetch members of all groups in that institute
      const groups = await Group.find({ institute: instituteId })
      const groupIds = groups.map((group) => group._id)
      memberships = await Memberships.find({ groupId: { $in: groupIds } })
        .populate("memberId")
        .populate("groupId")
    } else {
      // If neither is provided, return an error
      return NextResponse.json(
        { error: "Either groupId or instituteId must be provided" },
        { status: 400 }
      )
    }

    const members = memberships.map((membership) => ({
      ...membership.memberId.toObject(),
      groupId: membership.groupId,
      membership: membership,
    }))

    return NextResponse.json(members)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request) {
  await dbConnect()
  try {
    const body = await request.json()
    const { groupId, feeAmount, ...memberData } = body

    // Check for existing member
    const existingMember = await Member.findOne({
      $and: [
        { phoneNumber: memberData.phoneNumber },
        { email: memberData.email },
        { name: memberData.name },
      ],
    })

    let member
    if (existingMember) {
      member = existingMember
    } else {
      member = await Member.create(memberData)
    }

    let membership = await Memberships.findOne({
      memberId: member._id,
      groupId: groupId,
    });

    if (membership) {
      // Membership already exists, return a specific error
      return NextResponse.json({
        error: "Membership already exists",
        errorCode: "MEMBERSHIP_EXISTS",
        existingMembership: membership
      }, { status: 409 }); // 409 Conflict
    }

    // Create new membership only if it doesn't exist
    membership = await Memberships.create({
      memberId: member._id,
      groupId,
      feeAmount,
      feeStatus: "Pending",
    });

    const populatedMembership = await Memberships.findById(membership._id).populate("memberId")

    const response = {
      ...populatedMembership.memberId.toObject(),
      groupId: populatedMembership.groupId,
      membership: populatedMembership,
    }

    return NextResponse.json(response, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}

export async function PUT(request) {
  await dbConnect()
  const { searchParams } = new URL(request.url)
  const membershipId = searchParams.get("id")

  if (!membershipId) {
    return NextResponse.json(
      { error: "Membership ID is required" },
      { status: 400 }
    )
  }

  try {
    const body = await request.json()
    const { feeStatus, ...memberData } = body

    const membership = await Memberships.findById(membershipId)
    if (!membership) {
      return NextResponse.json(
        { error: "Membership not found" },
        { status: 404 }
      )
    }

    const updatedMember = await Member.findByIdAndUpdate(
      membership.memberId,
      memberData,
      { new: true }
    )
    const updatedMembership = await Memberships.findByIdAndUpdate(
      membershipId,
      { feeStatus },
      { new: true }
    )

    return NextResponse.json({
      member: updatedMember,
      membership: updatedMembership,
    })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(request) {
  await dbConnect()
  const { searchParams } = new URL(request.url)
  const membershipId = searchParams.get("id")

  if (!membershipId) {
    return NextResponse.json(
      { error: "Membership ID is required" },
      { status: 400 }
    )
  }

  try {
    const deletedMembership = await Memberships.findByIdAndDelete(membershipId)
    if (!deletedMembership) {
      return NextResponse.json(
        { error: "Membership not found" },
        { status: 404 }
      )
    }

    // Optionally, you can delete the Member document if it's not associated with any other groups
    const otherMemberships = await Memberships.findOne({
      memberId: deletedMembership.memberId,
    })
    if (!otherMemberships) {
      await Member.findByIdAndDelete(deletedMembership.memberId)
    }

    return NextResponse.json({ message: "Membership deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
