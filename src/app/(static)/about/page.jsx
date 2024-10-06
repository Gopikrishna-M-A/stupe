import React from 'react';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">About Stupe</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="mb-4">
          At Stupe, our mission is to simplify the fee collection process for educational institutions and students alike. We believe that by streamlining financial transactions, we can help schools focus on what truly matters: providing quality education.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Who We Are</h2>
        <p className="mb-4">
          Founded in [Year], Stupe is a team of dedicated professionals with backgrounds in education, finance, and technology. We understand the challenges faced by educational institutions in managing their finances and have created a solution that addresses these needs.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
        <ul className="list-disc list-inside mb-4">
          <li>Secure online fee collection</li>
          <li>Real-time transaction tracking</li>
          <li>Customizable fee structures</li>
          <li>Detailed financial reporting</li>
          <li>Integration with existing school management systems</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Commitment</h2>
        <p className="mb-4">
          We are committed to providing a secure, efficient, and user-friendly platform. Our team continuously works on improving our services based on feedback from our users and the latest developments in financial technology.
        </p>
      </section>
    </div>
  );
}