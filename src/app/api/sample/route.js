import { NextResponse } from "next/server";

export async function GET() {
    try {
      return NextResponse.json({ data: 'institutes' });
    } catch (error) {
      console.error('Error fetching data: ', error);
      return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}