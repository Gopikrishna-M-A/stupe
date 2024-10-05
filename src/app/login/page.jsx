'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { PhoneIcon, KeyIcon } from 'lucide-react'

const PhoneLoginPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('+91 6282571296')
  const [recaptchaVerifier, setRecaptchaVerifier] = useState()
  const [confirmationResult, setConfirmationResult] = useState()
  const [otp, setOtp] = useState('')
  const [isOtpSent, setIsOtpSent] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const recaptchaVerifier = new RecaptchaVerifier(
      auth,
      'recaptcha-container',
      {
        size: "invisible"
      }
    )
    setRecaptchaVerifier(recaptchaVerifier)

    return () => {
      recaptchaVerifier.clear()
    }
  }, [auth])

  const requestOtp = async () => {
    try {
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        recaptchaVerifier
      )
      console.log("confirmationResult", confirmationResult);
      setConfirmationResult(confirmationResult)
      setIsOtpSent(true)
    } catch (error) {
      console.error("Error sending OTP:", error)
    }
  }

  const verifyOtp = async () => {
    try {
      await confirmationResult?.confirm(otp)
      router.push('/')
    } catch (error) {
      console.error("Error verifying OTP:", error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Phone Login</CardTitle>
          <CardDescription>Enter your phone number to login</CardDescription>
        </CardHeader>
        <CardContent>
          <div id="recaptcha-container" />
          <div className="space-y-4">
            <div className="flex flex-col space-y-1.5">
              <Input
                id="phoneNumber"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                disabled={isOtpSent}
                icon={<PhoneIcon className="h-4 w-4 text-gray-500" />}
              />
            </div>
            {isOtpSent && (
              <div className="flex flex-col space-y-1.5">
                <Input
                  id="otp"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  type="number"
                  icon={<KeyIcon className="h-4 w-4 text-gray-500" />}
                />
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          {!isOtpSent ? (
            <Button className="w-full" onClick={requestOtp}>
              Send OTP
            </Button>
          ) : (
            <Button className="w-full" onClick={verifyOtp}>
              Verify OTP
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

export default PhoneLoginPage