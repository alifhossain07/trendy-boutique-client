import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-gray-100">
      {/* Introduction Section */}
      <div
        className="relative lg:h-[34rem] text-white py-20 lg:px-16 text-center bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4)), url('https://i.ibb.co.com/XL1fLXm/about-Us-Trendy.png')",
        }}
      >
        <div className="lg:max-w-5xl mx-auto lg:mt-14 p-10 rounded-lg">
          <h1 className="text-3xl lg:text-5xl uppercase font-title tracking-wider text-white font-bold lg:leading-tight">
            Welcome to Trendy <span className="text-blue-400">Boutique</span>
          </h1>
          <p className="text-lg lg:text-2xl font-para tracking-wider mt-6 max-w-3xl mx-auto">
            Dedicated to providing the best in men’s and women’s clothing and accessories.
          </p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="w-11/12 mx-auto py-20 space-y-20">

        {/* Our Story Section */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="font-title text-4xl mb-4">Our Story</h2>
          <p className="font-para text-lg mb-4">
            Founded in 2024, our journey began with a simple idea: to make high-quality fashion accessible to everyone.
            We believe that style should be expressive, unique, and inclusive.
          </p>
          <p className="font-para text-lg mb-4">
            Our commitment to sustainability and ethical practices has been the cornerstone of our brand. We strive to
            offer products that are not only fashionable but also environmentally friendly.
          </p>
        </div>

        {/* Our Mission Section */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="font-title text-4xl mb-4">Our Mission</h2>
          <p className="font-para text-lg mb-4">
            Our mission is to empower individuals to express their unique styles through our curated collections.
            We aim to provide exceptional quality, innovative designs, and a seamless shopping experience.
          </p>
        </div>

        {/* Sustainability Commitment Section */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="font-title text-4xl mb-4">Sustainability Commitment</h2>
          <p className="font-para text-lg mb-4">
            We are committed to sustainable and ethical fashion. Our clothing is made with environmentally-friendly
            materials and processes, ensuring that we care for both our customers and the planet.
          </p>
        </div>

        {/* Quality Assurance Section */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="font-title text-4xl mb-4">Quality Assurance</h2>
          <p className="font-para text-lg mb-4">
            Quality is at the forefront of everything we do. Each piece of clothing undergoes rigorous quality checks
            to ensure it meets our high standards. We believe great fashion should be durable and comfortable.
          </p>
        </div>

        {/* Join Our Community Section */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="font-title text-4xl mb-4">Join Our Community</h2>
          <p className="font-para text-lg mb-4">
            We invite you to join our community of fashion enthusiasts. Follow us on social media for the latest
            updates, style tips, and exclusive offers. Together, we can create a vibrant fashion culture that celebrates
            individuality.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-20">
        <p className="font-para text-lg">
          Thank you for choosing us. We look forward to serving you!
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
