import dbConnect from "@/lib/mongodb"
import Group from "@/models/Group"
import Memberships from "@/models/Memberships"
import { NextResponse } from "next/server"

export async function GET(request) {
  await dbConnect()
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  const instituteId = searchParams.get("instituteId")

  try {
    if (id) {
      const group = await Group.findById(id)
      const memberCount = await Memberships.countDocuments({ groupId: id })
      return NextResponse.json({ ...group.toObject(), memberCount })
    } else if (instituteId) {
      const groups = await Group.find({ institute: instituteId })
      const groupsWithMemberCount = await Promise.all(groups.map(async (group) => {
        const memberCount = await Memberships.countDocuments({ groupId: group._id })
        return { ...group.toObject(), memberCount }
      }))
      return NextResponse.json(groupsWithMemberCount)
    } else {
      const groups = await Group.find({})
      return NextResponse.json(groups)
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request) {
  await dbConnect()
  try {
    const body = await request.json()
    const newGroup = await Group.create(body)
    return NextResponse.json(newGroup, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}

export async function DELETE(request) {
  await dbConnect()
  const { searchParams } = new URL(request.url)
  const groupId = searchParams.get("id")
  
  if (!groupId) {
    return NextResponse.json({ error: "Group ID is required" }, { status: 400 })
  }

  try {
    const deletedGroup = await Group.findByIdAndDelete(groupId)
    if (!deletedGroup) {
      return NextResponse.json({ error: "Group not found" }, { status: 404 })
    }
    // Delete all memberships associated with this group
    await Memberships.deleteMany({ groupId: groupId })
    return NextResponse.json({ message: "Group and associated memberships deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}