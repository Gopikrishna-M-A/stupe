'use client'
import React from 'react';
import { ContactForm } from './ContactForm';

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
          <p className="mb-4">
            We're here to help and answer any question you might have. We look forward to hearing from you!
          </p>
          
          <div className="mb-4">
            <h3 className="font-semibold">Email</h3>
            <p>support@feepay.com</p>
          </div>
          
          <div className="mb-4">
            <h3 className="font-semibold">Phone</h3>
            <p>+1 (123) 456-7890</p>
          </div>
          
          <div className="mb-4">
            <h3 className="font-semibold">Address</h3>
            <p>123 FeePay Street</p>
            <p>Tech City, TC 12345</p>
            <p>United States</p>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Send us a Message</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}