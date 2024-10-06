import React from "react";

export default function AboutPage() {
  const aboutContent = [
    {
      title: "Our Purpose",
      content:
        "At Stupe, we’re all about making fee collection simple and hassle-free for everyone. By streamlining transactions, we help our clients focus on what matters most—boosting productivity and making day-to-day operations a breeze.",
    },
    {
      title: "Our Story",
      content:
        "Founded in 2024, Stupe is a passionate team with backgrounds in education, finance, and technology. We know the struggles educational institutions face with financial management, so we’ve built a solution that makes life easier for everyone involved.",
    },
    {
      title: "Our Promise to You",
      content:
        "We’re dedicated to giving you a secure, efficient, and easy-to-use platform that takes the headache out of fee collection. We’re always listening to your feedback and keeping up with the latest tech to make sure we’re delivering the best experience possible.",
    },
    {
      title: "Here’s What We Bring to the Table",
      content: [
        "Stress-Free Online Fee Collection",
        "Real-Time Payment Tracking",
        "Flexible Fee Structures",
        "In-Depth Financial Reporting",
        "Easy Integration with School Systems",
      ],
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 font-main space-y-8 py-12">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Who We Are at Stupe
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {aboutContent.slice(0, 3).map((section, index) => (
          <section key={index} className="card-aboutus bg-white shadow-md rounded-lg p-6 flex flex-col text-start">
            <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
            <div className="mb-4">{section.content}</div>
          </section>
        ))}
      </div>

      <div className="space-y-6">
        <h2 className="text-3xl font-semibold mb-4 text-center">
          {aboutContent[3].title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aboutContent[3].content.map((item, index) => (
            <div
              key={index}
              className="card-aboutus"
            >
              <p className="text-lg font-bold text-gray-700">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
