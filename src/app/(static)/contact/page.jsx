"use client";
import React from "react";
import { ContactForm } from "./ContactForm";


export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="text-center mb-4">
        <h1 className="text-5xl font-bold mb-4">Contact our friendly team</h1>
        <p className="text-lg text-gray-600">Let us know how we can help.</p>
      </div>
      <div className="w-full flex justify-center ">
        <div className="w-full mx-32  mb-16">
          <ContactForm />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <div className="card-aboutus">
          <h3 className="text-xl font-semibold mb-2">Email Us</h3>
          <p className="text-gray-600 mb-4">Speak to our friendly team.</p>
          <a
            href="mailto:sales@untitledui.com"
            className=" font-medium"
          >
            stupe.comapany@gmail.com
          </a>
        </div>
        <div className="card-aboutus">
          <h3 className="text-xl font-semibold mb-2">Call us</h3>
          <p className="text-gray-600 mb-4">Mon-Fri from 8am to 5pm.</p>
          <a href="tel:+1555000000" className=" font-medium">
            +91 9110475939
          </a>
        </div>
      </div>
    </div>
  );
}
