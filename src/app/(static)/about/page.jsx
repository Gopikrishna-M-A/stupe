import React from 'react';

const AboutStupe = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">About Stupe</h1>
      
      <p className="mb-6">
        Welcome to Stupe, your ultimate fee management solution designed to simplify and streamline the fee 
        collection process for various sectors. Whether you are a tuition center, playschool, gym, yoga studio, music 
        school, dance academy, or a hostel, Stupe is here to make your fee collection hassle-free and efficient.
      </p>

      <h2 className="text-2xl font-semibold mb-4">What is Stupe?</h2>
      <p className="mb-6">
        Our app enables you to 
        effortlessly manage, track, and collect fees. Stupe is tailored to cater to the unique needs of different 
        institutions and service providers, ensuring that you can focus more on your core activities and less on 
        administrative tasks. With Stupe, you can automate reminders, track payments, generate receipts, and 
        maintain detailed reports, all in one user-friendly interface.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Who is Stupe for?</h2>
      <ul className="list-none space-y-4 mb-6 ml-5">
        <li>
          <strong>Educational Institutions:</strong> Tuition centers, playschools, and after-school programs can benefit from our 
          easy-to-use platform to manage student fees, send reminders, and keep track of payments.
        </li>
        <li>
          <strong>Fitness Centers:</strong> Gyms, yoga studios, and other fitness establishments can streamline their membership fee 
          collection, track attendance, and offer flexible payment plans.
        </li>
        <li>
          <strong>Creative Arts Schools:</strong> Music schools, dance academies, and art classes can automate fee reminders, collect 
          payments, and manage student enrollments effortlessly.
        </li>
        <li>
          <strong>Accommodation Services:</strong> Hostels, PG accommodations, and other lodging services can efficiently manage rental 
          payments, track due dates, and ensure timely collections.
        </li>
      </ul>

      <p className="mb-6">
        At Stupe, we are committed to providing a seamless fee management experience that saves you time and 
        reduces stress. Join us and transform the way you handle fee collection.
      </p>

    </div>
  );
};

export default AboutStupe;