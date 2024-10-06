import React from 'react';

const ShippingDelivery = () => {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Shipping and Delivery Policy</h1>
      
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Digital Products and Services</h2>
        <p className="text-base">
          Stupe is a software company, and we offer digital products and services. As such, there are no physical goods to be shipped or delivered. Once a service has been purchased, access to the digital service will be provided immediately or as per the agreed-upon terms.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Service Activation</h2>
        <p className="text-base">
          After purchasing a service from Stupe, you will receive instructions on how to access and activate your service via email or within the platform. In case you do not receive access to the service after payment, please contact us to resolve the issue promptly.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">No Physical Shipping</h2>
        <p className="text-base">
          Since we do not offer physical products, there are no shipping or delivery fees associated with any of our services. All services are provided digitally through our platform or other online channels.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
        <p className="text-base">
          If you have any questions regarding the delivery of your service or access issues, please reach out to our support team at <a href="mailto:support@stupe.com" className="text-blue-500">support@stupe.com</a>.
        </p>
      </section>
    </div>
  );
};

export default ShippingDelivery;
