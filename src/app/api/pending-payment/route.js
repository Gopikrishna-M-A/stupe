import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import PendingPayments from "@/models/PendingPayments";
import Group from "@/models/Group";
import Memberships from "@/models/Memberships";

export async function GET(request) {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const instituteId = searchParams.get('instituteId');

    if (!instituteId) {
        return NextResponse.json({ error: "Institute ID is required" }, { status: 400 });
    }

    try {
        // Step 1: Find all groups associated with the institute
        const groups = await Group.find({ institute: instituteId });
        console.log("Step 1 - Found groups:", groups.length, groups.map(g => g._id));

        const groupIds = groups.map(group => group._id);

        // Step 2: Find memberships associated with these groups
        const memberships = await Memberships.find({ groupId: { $in: groupIds } });
        console.log("Step 2 - Found memberships:", memberships.length);

        const membershipIds = memberships.map(membership => membership._id);

        // Step 3: Find pending payments for these memberships
        const pendingPayments = await PendingPayments.find({
            membershipId: { $in: membershipIds },
            expiresAt: { $gt: new Date() } // Only include non-expired payments
        }).populate({
            path: 'membershipId',
            populate: [
                { path: 'memberId' },
                { path: 'groupId' }
            ]
        });

        console.log("Step 3 - Found pending payments:", pendingPayments.length);

        // Format the response
        const formattedPayments = pendingPayments.map(payment => ({
            id: payment._id,
            amount: payment.amount,
            member: payment.membershipId && payment.membershipId.memberId ? {
                id: payment.membershipId.memberId._id,
                name: payment.membershipId.memberId.name,
                email: payment.membershipId.memberId.email
            } : null,
            group: payment.membershipId && payment.membershipId.groupId ? {
                id: payment.membershipId.groupId._id,
                name: payment.membershipId.groupId.groupName
            } : null,
            expiresAt: payment.expiresAt
        }));

        return NextResponse.json(formattedPayments);
    } catch (error) {
        console.error("Error fetching pending payments:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}