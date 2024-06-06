import React from "react";
import LeftSidebar from "./LeftSidebar";
import { useInView } from "react-intersection-observer";
import "animate.css/animate.min.css";

const AboutUs = () => {
  const [whyUsRef, whyUsInView] = useInView({
    threshold: 0.7,
    triggerOnce: true,
  });

  const [ourCommitmentRef, ourCommitmentInView] = useInView({
    threshold: 0.9, // Trigger animation when 90% of the section is visible
    triggerOnce: true, // Trigger animation only once
  });

  const [joinUsRef, joinUsInView] = useInView({
    threshold: 0.9, // Trigger animation when 90% of the section is visible
    triggerOnce: true, // Trigger animation only once
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      <LeftSidebar />
      <div className="w-full pt-[80px] container mx-auto px-4 py-8">
        <h1 className="text-5xl font-bold mb-12 text-center animate__animated animate__fadeIn">
          About Us
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex flex-col justify-center items-center bg-white rounded-lg shadow-lg p-8 transition-transform transform hover:scale-105">
            <img
              src="https://img.freepik.com/free-photo/digital-marketing-with-icons-business-people_53876-94833.jpg"
              alt="Team"
              className="w-full h-72 object-cover mb-8 rounded-lg shadow-lg animate__animated animate__fadeInLeft"
            />
            <div className="text-center">
              <h2 className="text-4xl font-semibold mb-4 animate__animated animate__fadeInLeft">
                Who We Are
              </h2>
              <p className="text-lg text-gray-600 mb-6 animate__animated animate__fadeInLeft">
                At <strong>Digital Success</strong>, we are a team of passionate
                and creative professionals dedicated to driving your business
                forward in the digital landscape. From SEO to social media
                management, our innovative solutions are tailored to meet your
                unique needs.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center bg-white rounded-lg shadow-lg p-8 transition-transform transform hover:scale-105">
            <img
              src="https://static.vecteezy.com/system/resources/previews/005/732/506/non_2x/man-hand-holding-smart-phone-digital-marketing-word-with-icon-business-virtual-screen-free-photo.jpg"
              alt="Mission"
              className="w-full h-72 object-cover mb-8 rounded-lg shadow-lg animate__animated animate__fadeInRight"
            />
            <div className="text-center">
              <h2 className="text-4xl font-semibold mb-4 animate__animated animate__fadeInRight">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6 animate__animated animate__fadeInRight">
                Our mission is to empower businesses to achieve their goals
                through strategic digital marketing. We believe in the power of
                data-driven decisions and creative campaigns to transform your
                online presence and drive growth.
              </p>
            </div>
          </div>
        </div>

        <div
          ref={whyUsRef}
          className={`mt-16 bg-white rounded-lg shadow-lg p-8 transition-transform transform ${
            whyUsInView ? "animate__animated animate__fadeIn" : ""
          }`}
        >
          <h2 className="text-4xl font-semibold mb-8 text-center">
            Why Choose Us?
          </h2>
          <ul className="list-disc list-inside text-lg text-gray-600 space-y-4">
            <li>
              🌐 <strong>Comprehensive Services:</strong> We offer a full suite
              of digital marketing services, including SEO, PPC, content
              marketing, social media management, and more.
            </li>
            <li>
              📈 <strong>Results-Driven:</strong> Our strategies are focused on
              delivering measurable results to help you achieve your business
              objectives.
            </li>
            <li>
              🎯 <strong>Personalized Approach:</strong> We take the time to
              understand your business and create customized solutions that meet
              your specific needs.
            </li>
            <li>
              💡 <strong>Innovative Solutions:</strong> We stay ahead of
              industry trends and use the latest technologies to ensure your
              campaigns are effective and cutting-edge.
            </li>
          </ul>
        </div>

        <div
          ref={ourCommitmentRef}
          className={`mt-16 bg-white rounded-lg shadow-lg p-8 transition-transform transform ${
            ourCommitmentInView ? "animate__animated animate__fadeIn" : ""
          }`}
        >
          <h2 className="text-4xl font-semibold mb-8 text-center">
            Our Commitment
          </h2>
          <p className="text-lg text-gray-600 mb-6 text-center">
            We are committed to providing exceptional service and delivering
            outstanding results. Our team is dedicated to your success and is
            always here to support you every step of the way.
          </p>
        </div>

        <div
          ref={joinUsRef}
          className={`mt-16 bg-white rounded-lg shadow-lg p-8 transition-transform transform ${
            joinUsInView ? "animate__animated animate__fadeIn" : ""
          }`}
        >
          <h2 className="text-4xl font-semibold mb-8 text-center">Join Us</h2>
          <p className="text-lg text-gray-600 mb-6 text-center">
            Join the <strong>Digital Success</strong> community today and let us
            help you achieve your digital marketing goals!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
