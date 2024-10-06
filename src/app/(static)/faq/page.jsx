import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "What is Stupe?",
    answer: "Stupe is a platform that facilitates fee collection for educational institutions. It allows schools and colleges to easily collect fees from students through a secure online system."
  },
  {
    question: "How do I register my institution?",
    answer: "To register your institution, click on the &apos;Sign Up&apos; button on the homepage. Fill out the required information about your institution and create an account. Our team will verify your details and activate your account within 1-2 business days."
  },
  {
    question: "What are the fees for using Stupe?",
    answer: "Stupe charges a service fee of 3-5% per transaction. The exact percentage depends on your institution&apos;s volume of transactions. For large organizations, we offer custom pricing. Please contact our sales team for more information."
  },
  {
    question: "How long does it take for funds to be transferred to my institution&apos;s account?",
    answer: "Funds are typically transferred to your institution&apos;s linked bank account within 2-3 business days after the transaction is completed."
  },
  {
    question: "Can students pay fees in installments?",
    answer: "Yes, Stupe supports installment-based fee payments. Institutions can set up payment plans, allowing students to pay their fees in multiple installments over time."
  },
  {
    question: "Is Stupe secure?",
    answer: "Yes, Stupe uses industry-standard encryption and security measures to protect all transactions and user data. We are compliant with PCI-DSS standards for handling payment information."
  },
  {
    question: "How can I contact customer support?",
    answer: "You can reach our customer support team by email at support@stupe.co or through the contact form on our website. Our support hours are Monday to Friday, 9 AM to 6 PM."
  }
];

export default function FAQPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
      
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-₹{index}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <p className="text-center">
          Can&apos;t find the answer you&apos;re looking for? Visit our <a href="/help" className="text-blue-600 hover:underline">Help Center</a> or <a href="/contact" className="text-blue-600 hover:underline">contact our support team</a>.
        </p>
      </div>
    </div>
  );
}