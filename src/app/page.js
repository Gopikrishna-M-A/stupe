import React from "react"
import { Button } from "@/components/ui/button"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"

export default function LandingPage() {
  return (
    <div className='min-h-screen flex flex-col justify-between bg-gray-100'>
      <Nav />

      <main>
        <div className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
          <div className='px-4 py-6 sm:px-0'>
            <h1 className='text-4xl font-bold text-gray-900 mb-4'>
              Simplify Fee Collection for Your Institute
            </h1>
            <p className='text-xl text-gray-600 mb-8'>
              Streamline your fee collection process with our easy-to-use
              platform.
            </p>
            <div className='space-x-4'>
              <Button size='lg'>Get Started</Button>
              <Button variant='outline' size='lg'>
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
