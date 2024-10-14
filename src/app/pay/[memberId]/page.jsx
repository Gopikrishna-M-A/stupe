'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function PaymentPage({params}) {
  const { memberId } = params
  const [memberData, setMemberData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMemberData();
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

  const handlePayNow = async () => {
    try {
      const response = await axios.post('/api/create-razorpay-order', {
        memberId: memberData.member._id,
        groupId: memberData.membership.groupId,
        membershipId: memberData.membership._id,
        amount: memberData.membership.feeAmount,
      });

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: response.data.amount,
        currency: "INR",
        name: "Your Company Name",
        description: `Fee payment for ${memberData.member.name}`,
        order_id: response.data.id,
        handler: function (response) {
          handlePaymentSuccess(response);
        },
        prefill: {
          name: memberData.member.name,
          email: memberData.member.email,
          contact: memberData.member.phoneNumber,
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Error creating Razorpay order:", error);
    }
  };

  const handlePaymentSuccess = async (response) => {
    try {
      await axios.post('/api/verify-payment', {
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_order_id: response.razorpay_order_id,
        razorpay_signature: response.razorpay_signature,
        memberId: memberData.member._id,
        groupId: memberData.membership.groupId,
        membershipId: memberData.membership._id,
      });
      // Handle successful payment (e.g., show success message, redirect)
    } catch (error) {
      console.error("Error verifying payment:", error);
      // Handle payment verification failure
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!memberData) {
    return <div>Member not found</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Fee Payment</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Name: {memberData.member.name}</p>
          <p>Group: {memberData.group.groupName}</p>
          <p>Fee Amount: ₹{memberData.membership.feeAmount}</p>
          <Button onClick={handlePayNow} className="mt-4">Pay Now</Button>
        </CardContent>
      </Card>
    </div>
  );
}