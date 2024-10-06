import React from 'react';

export default function TermsAndConditions() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
        <p className="mb-4">
          By accessing and using the Stupe service, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our service.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
        <p className="mb-4">
        Stupe provides a platform for educational institutions to collect fees from their students. We act as an intermediary to facilitate these transactions.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
        <p className="mb-4">
          To use certain features of the Service, you must register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Fees and Payments</h2>
        <p className="mb-4">
        Stupe charges a service fee of 3-5% per fee collected. For larger organizations, custom pricing options may be available upon request.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Privacy Policy</h2>
        <p className="mb-4">
          Your use of the Service is also governed by our Privacy Policy, which can be found [link to Privacy Policy].
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">6. Modifications to the Service</h2>
        <p className="mb-4">
        Stupe reserves the right to modify or discontinue, temporarily or permanently, the Service with or without notice.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">7. Governing Law</h2>
        <p className="mb-4">
          These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without giving effect to any principles of conflicts of law.
        </p>
      </section>

      <p className="text-sm text-gray-600 mt-8">
        Last updated: [Date]
      </p>
    </div>
  );
}