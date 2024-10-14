import dbConnect from "@/lib/mongodb"
import Institute from "@/models/Institute"
import { NextResponse } from "next/server"

export async function GET(request) {
  await dbConnect()
  const { searchParams } = new URL(request.url)
  const key = searchParams.get("key")
  var value = searchParams.get("value")

  if (key == "phoneNumber") {
    value = value.slice(3)
  }

  try {
    if (key && value) {
      const query = { [key]: value }; 
      const institute = await Institute.findOne(query)
      return NextResponse.json(institute)
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request) {
  await dbConnect()
  try {
    const body = await request.json()
    const newInstitute = await Institute.create(body)
    return NextResponse.json(newInstitute, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}

export async function DELETE(request) {
  await dbConnect()
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 })
  }

  try {
    const deletedInstitute = await Institute.findByIdAndDelete(id)
    if (!deletedInstitute) {
      return NextResponse.json(
        { error: "Institute not found" },
        { status: 404 }
      )
    }
    return NextResponse.json({ message: "Institute deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
