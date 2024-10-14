import dbConnect from '@/lib/mongodb';
import Group from '@/models/Group';
import Memberships from '@/models/Memberships';
import { NextResponse } from 'next/server';

export async function GET(request) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const instituteId = searchParams.get('instituteId');
  
  try {
    // Fetch total members
    const groups = await Group.find({ institute: mongoose.Types.ObjectId(instituteId) });

    // Step 2: Extract group IDs from the found groups
    const groupIds = groups.map(group => group._id);
  
    // Step 3: Count memberships for those group IDs
    const totalMembers = await Memberships.countDocuments({ groupId: { $in: groupIds } });
  
    // Fetch total pending payments
    const pendingPayments = await Memberships.aggregate([
      { $match: { feeStatus: { $in: ['Pending', 'Partial'] }, 'groupId.institute': instituteId } },
      { $group: { _id: null, totalPending: { $sum: '$feeAmount' } } },
    ]);

    const totalPending = pendingPayments[0]?.totalPending || 0;

    // Return combined result
    return NextResponse.json({ totalMembers, totalPending });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
