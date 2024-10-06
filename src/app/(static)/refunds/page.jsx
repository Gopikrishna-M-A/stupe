import React from 'react';

export default function RefundPolicy() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Refund Policy</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Refund Eligibility</h2>
        <p className="mb-4">
          As Stupe is a platform facilitating fee payments between educational institutions and students, refunds are generally processed according to the policies of the respective institutions. Stupe does not directly issue refunds for the fees paid to educational institutions.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Service Fee Refunds</h2>
        <p className="mb-4">
          The service fee charged by Stupe (3-5% of the transaction amount) is non-refundable except in cases of technical error on our part that results in an incorrect charge.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Refund Process for Institutional Fees</h2>
        <p className="mb-4">
          If you believe you are eligible for a refund of fees paid to an educational institution:
        </p>
        <ol className="list-decimal list-inside mb-4">
          <li className="mb-2">Contact the educational institution directly to request a refund.</li>
          <li className="mb-2">If approved, the institution will initiate the refund process through our platform.</li>
          <li className="mb-2">Once initiated, refunds typically take 5-10 business days to process, depending on your payment method and financial institution.</li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Disputed Charges</h2>
        <p className="mb-4">
          If you notice any unauthorized or incorrect charges, please contact our support team immediately at [support email]. We will investigate the issue and work towards a resolution.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Changes to This Policy</h2>
        <p className="mb-4">
          We reserve the right to modify this refund policy at any time. Changes and clarifications will take effect immediately upon their posting on the website.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">6. Contact Us</h2>
        <p className="mb-4">
          If you have any questions about our refund policy, please contact us at [contact email].
        </p>
      </section>

      <p className="text-sm text-gray-600 mt-8">
        Last updated: [Date]
      </p>
    </div>
  );
}