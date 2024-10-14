'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2 } from "lucide-react";
import { useRouter } from 'next/navigation';

export default function PaymentSuccessPage({params}) {
  const router = useRouter();
  const { memberId } = params
  const [memberData, setMemberData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (memberId) {
      fetchMemberData();
    }
  }, [memberId]);

  const fetchMemberData = async () => {
    try {
      const response = await axios.get(`/api/members/${memberId}`);
      setMemberData(response.data);
    } catch (error) {
      console.error("Error fetching member data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
<div className="h-screen w-screen flex justify-center items-center p-10">
  <Card className="w-full max-w-3xl">
    <CardHeader className="text-center">
      <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
      <CardTitle className="text-2xl font-bold">Payment Confirmation</CardTitle>
    </CardHeader>
    <CardContent className="text-center ">
      <p className="text-gray-600">Dear {memberData?.member.name},</p>
      <p className="text-gray-500">We are pleased to confirm that your payment of ₹{memberData?.membership.feeAmount} has been successfully processed.</p>
      <p className="text-gray-500">You are now an active member of the <strong>{memberData?.group.groupName}</strong> group. Thank you for your support.</p>
    </CardContent>
  </Card>
</div>

  );
}