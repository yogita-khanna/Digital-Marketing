import React from "react";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import "animate.css";

const FrontPage = () => {
  const [heroRef, heroInView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const [whyUsRef, whyUsInView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const [howItWorksRef, howItWorksInView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  return (
    <div className="pt-[60px] w-full">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className={`bg-gradient-to-r from-[#78350f] to-black text-white py-24 px-6 ${
          heroInView ? "animate__animated animate__fadeIn" : ""
        }`}
      >
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Digital Marketing Solutions</h1>
          <p className="text-lg mb-8">
            Accelerate Your Business Growth Online
          </p>
          <Link
            to="/services"
            className="bg-white text-[#78350f] font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 hover:bg-[#78350f] hover:text-white"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section
        ref={whyUsRef}
        className={`bg-gray-100 py-24 px-6 ${
          whyUsInView ? "animate__animated animate__fadeIn" : ""
        }`}
      >
        <div className="container mx-auto flex flex-wrap items-center">
          <div className="w-full md:w-1/2">
            <h2 className="text-4xl font-bold mb-6">Why Choose Us?</h2>
            <p className="text-lg mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id
              erat a libero pellentesque pulvinar. Cras sodales, libero nec
              dignissim malesuada.
            </p>
            <ul className="list-disc pl-6 text-lg text-gray-700 space-y-2">
              <li>Strategic Planning</li>
              <li>Targeted Campaigns</li>
              <li>Customized Solutions</li>
              <li>Proven Results</li>
            </ul>
          </div>
          <div className="w-full md:w-1/2 mt-8 md:mt-0">
            <img
              src="https://www.shutterstock.com/shutterstock/photos/1932042689/display_1500/stock-photo-businessman-using-mobile-smart-phone-business-global-internet-connection-application-technology-1932042689.jpg"
              alt="Why Choose Us"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        ref={howItWorksRef}
        className={`py-24 px-6 ${
          howItWorksInView ? "animate__animated animate__fadeIn" : ""
        }`}
      >
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-10">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="p-6 rounded-lg shadow-md bg-white transition duration-300 hover:shadow-lg transform hover:scale-105">
              <h3 className="text-2xl font-semibold mb-4">Strategy Development</h3>
              <p className="text-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus condimentum nulla vel semper scelerisque.
              </p>
            </div>
            <div className="p-6 rounded-lg shadow-md bg-white transition duration-300 hover:shadow-lg transform hover:scale-105">
              <h3 className="text-2xl font-semibold mb-4">Campaign Execution</h3>
              <p className="text-lg">
                Fusce congue mauris sit amet eros tempor, vitae tempus justo
                ultrices.
              </p>
            </div>
            <div className="p-6 rounded-lg shadow-md bg-white transition duration-300 hover:shadow-lg transform hover:scale-105">
              <h3 className="text-2xl font-semibold mb-4">Performance Monitoring</h3>
              <p className="text-lg">
                Vestibulum ac felis accumsan, convallis sapien id, lobortis
                mauris.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FrontPage;
