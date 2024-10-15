import { Button } from "@/components/ui/button"
import Link from "next/link"
import React from "react"

const PaymentLinkExpired = () => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4'>
      <div className='bg-white shadow-lg rounded-lg p-6 max-w-md text-center'>
        <h1 className='text-3xl font-bold text-primary mb-4'>
          Payment Link Expired
        </h1>
        <p className='text-gray-700 mb-6'>
          The payment link you tried to access has expired. Please request a new
          payment link or contact support if you need further assistance.
        </p>
        <Link href='mailto:support@stupe.co'>
          <Button>Contact Support</Button>
        </Link>
      </div>
    </div>
  )
}

export default PaymentLinkExpired
