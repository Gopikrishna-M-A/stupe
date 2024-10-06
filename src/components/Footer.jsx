import React from "react"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className='bg-gray-800 text-white'>
      <div className='max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
          <div>
            <h3 className='text-sm font-semibold uppercase tracking-wider'>
              Stupe
            </h3>
            <ul className='mt-4 space-y-4'>
              <li>
                <Link
                  href='/about'
                  className='text-base text-gray-300 hover:text-white'>
                  About
                </Link>
              </li>
              <li>
                <Link
                  href='/contact'
                  className='text-base text-gray-300 hover:text-white'>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className='text-sm font-semibold uppercase tracking-wider'>
              Legal
            </h3>
            <ul className='mt-4 space-y-4'>
              <li>
                <Link
                  href='/privacy'
                  className='text-base text-gray-300 hover:text-white'>
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href='/terms'
                  className='text-base text-gray-300 hover:text-white'>
                  Terms
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className='text-sm font-semibold uppercase tracking-wider'>
              Support
            </h3>
            <ul className='mt-4 space-y-4'>
              <li>
                <Link
                  href='/refunds'
                  className='text-base text-gray-300 hover:text-white'>
                  Refunds
                </Link>
              </li>
              <li>
                <Link
                  href='/shipping'
                  className='text-base text-gray-300 hover:text-white'>
                 Shipping
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className='text-sm font-semibold uppercase tracking-wider'>
              Connect
            </h3>
            <ul className='mt-4 space-y-4'>
              <li>
                <a
                  href='#'
                  className='text-base text-gray-300 hover:text-white'>
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-base text-gray-300 hover:text-white'>
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className='mt-8 border-t border-gray-700 pt-8'>
          <p className='text-base text-gray-400 xl:text-center'>
            &copy; 2024 Stupe. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
