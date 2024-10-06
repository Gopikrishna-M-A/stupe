import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const Nav = () => {
  return (
    <header className='bg-white shadow-sm'>
      <nav className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between h-16'>
          <div className='flex'>
            <div className='flex-shrink-0 flex items-center'>
              <Link href='/' className='text-2xl font-bold text-[#005180]'>stupe</Link>
            </div>
          </div>
          <div className='flex items-center'>
            <Link href='/sign-in'>
              <Button variant='outline' className='mr-2'>
                sign in
              </Button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Nav
