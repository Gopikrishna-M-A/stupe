import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-blue-600">stupe</span>
              </div>
            </div>
            <div className="flex items-center">
              <Link href="/login">
                <Button variant="outline" className="mr-2">Log in</Button>
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Simplify Fee Collection for Your Institute</h1>
            <p className="text-xl text-gray-600 mb-8">Streamline your fee collection process with our easy-to-use platform.</p>
            <div className="space-x-4">
              <Button size="lg">Get Started</Button>
              <Button variant="outline" size="lg">Learn More</Button>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider">Company</h3>
              <ul className="mt-4 space-y-4">
                <li><Link href="/about" className="text-base text-gray-300 hover:text-white">About</Link></li>
                <li><Link href="/contact" className="text-base text-gray-300 hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider">Legal</h3>
              <ul className="mt-4 space-y-4">
                <li><Link href="/privacy" className="text-base text-gray-300 hover:text-white">Privacy</Link></li>
                <li><Link href="/terms" className="text-base text-gray-300 hover:text-white">Terms</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider">Support</h3>
              <ul className="mt-4 space-y-4">
                <li><Link href="/faq" className="text-base text-gray-300 hover:text-white">FAQ</Link></li>
                <li><Link href="/help" className="text-base text-gray-300 hover:text-white">Help Center</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider">Connect</h3>
              <ul className="mt-4 space-y-4">
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Twitter</a></li>
                <li><a href="#" className="text-base text-gray-300 hover:text-white">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8">
            <p className="text-base text-gray-400 xl:text-center">&copy; 2024 FeePay. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}