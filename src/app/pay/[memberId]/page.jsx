"use client"
import React, { useState, useEffect } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Loader2, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useRouter } from "next/navigation"

export default function PaymentPage({ params }) {
  const { memberId } = params
  const router = useRouter()
  const [memberData, setMemberData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [paymentStatus, setPaymentStatus] = useState("pending")

  useEffect(() => {
    fetchMemberData()
  }, [memberId])

  const fetchMemberData = async () => {
    try {
      const response = await axios.get(`/api/members/${memberId}`)
      setMemberData(response.data)
      setPaymentStatus(
        response.data.membership.feeStatus === "Paid" ? "success" : "pending"
      )
    } catch (error) {
      console.error("Error fetching member data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePayNow = async () => {
    try {
      const response = await axios.post("/api/create-razorpay-order", {
        memberId: memberData.member._id,
        groupId: memberData.membership.groupId,
        membershipId: memberData.membership._id,
        amount: memberData.membership.feeAmount,
      })

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: response.data.amount,
        currency: "INR",
        name: "Your Company Name",
        description: `Fee payment for ${memberData.member.name}`,
        order_id: response.data.id,
        handler: function (response) {
          handlePaymentSuccess(response)
        },
        prefill: {
          name: memberData.member.name,
          email: memberData.member.email,
          contact: memberData.member.phoneNumber,
        },
      }

      const paymentObject = new window.Razorpay(options)
      paymentObject.open()
    } catch (error) {
      console.error("Error creating Razorpay order:", error)
    }
  }

  const handlePaymentSuccess = async (response) => {
    try {
      await axios.post("/api/verify-payment", {
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_order_id: response.razorpay_order_id,
        razorpay_signature: response.razorpay_signature,
        memberId: memberData.member._id,
        groupId: memberData.membership.groupId,
        membershipId: memberData.membership._id,
      })
      setPaymentStatus("success")
      router.push(`/payment-success/${memberId}`)
    } catch (error) {
      console.error("Error verifying payment:", error)
      setPaymentStatus("error")
    }
  }

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Loader2 className='h-8 w-8 animate-spin text-primary' />
      </div>
    )
  }

  if (!memberData) {
    return (
      <Alert variant='destructive' className='max-w-md mx-auto mt-8'>
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Member not found. Please try again.</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className='h-screen w-screen flex justify-center items-center p-10'>
      <Card className='w-full max-w-2xl'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold'>Fee Payment</CardTitle>
          <CardDescription>Complete your payment securely</CardDescription>
        </CardHeader>
        <CardContent>
          {paymentStatus === "success" ? (
            <Alert className='mb-4'>
              <CheckCircle2 className='h-4 w-4' />
              <AlertTitle>Payment Successful</AlertTitle>
              <AlertDescription>
                Your payment has been processed successfully. Thank you!
              </AlertDescription>
            </Alert>
          ) : (
            <>
              <div className=''>
                <p>
                  Thank you, <strong>{memberData.member.name}</strong>, for
                  being a valued member.
                </p>
                <p>
                  You are affiliated with the{" "}
                  <strong>{memberData.group.groupName}</strong> group.
                </p>
                <p>
                  Your total membership fee is{" "}
                  <strong>₹{memberData.membership.feeAmount}</strong>.
                </p>
              </div>
              <Button onClick={handlePayNow} className='w-full mt-6' size='lg'>
                Pay Now
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
