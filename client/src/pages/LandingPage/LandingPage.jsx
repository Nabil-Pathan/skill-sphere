import React from 'react';
import { Link } from 'react-router-dom';
import HeroImage from "../../images/HomeImage.png";
import CompassImage from "../../images/compass-image.png";
import SaveMoneyImage from "../../images/save-money.png";
import FlexibleLearningImage from "../../images/flexible-learning.png";

const cardData = [
  { id: 1, image: CompassImage, title: 'Learn anything', description: 'Explore any interest or trending topic, take prerequisites, and advance your skills' },
  { id: 2, image: SaveMoneyImage, title: 'Save money', description: 'Spend less money on your learning if you plan to take multiple courses this year' },
  { id: 3, image: FlexibleLearningImage, title: 'Flexible Learning', description: 'Learn at your own pace, move between multiple courses, or switch to a different course' },
];

const LandingPage = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="min-h-screen md:flex-row flex-col  flex items-center justify-center border-b-2 border-gray-300">
        {/* Right Section - Header */}
        <div className="flex flex-col items-center justify-center px-6 py-4 flex-1">
          <h1 className="text-4xl md:text-6xl text-center font-extrabold mb-4" style={{ letterSpacing: '4px' }}>Welcome to <span className="text-green-600"> SkillSphere </span></h1>
          <p className="md:text-xl text-center mb-8">
            Learn. Create. Succeed. Unlock your potential with SkillSphere.
          </p>
          <Link to="/signup">
            <button className="bg-green-600 text-white hover:bg-green-500 font-bold py-3 px-8 rounded-full transition duration-300">
              Get Started
            </button>
          </Link>
        </div>
        {/* Left Section - Image */}
        <div className="flex-1 h-screen items-center justify-center bg-green-600">
          <img
            src={HeroImage}  // Replace with your image URL
            alt="Illustration"
            className="w-full"
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="flex flex-col mt-5 items-center justify-center p-8">
        <h2 className="text-3xl md:text-4xl mb-4 text-center">Invest in your career with Skill Sphere</h2>
        <div className="grid grid-cols-1 mt-4 md:grid-cols-3 gap-8">
          {cardData.map((card) => (
            <div key={card.id} className="bg-white custom-shadow-1 hover:shadow-xl transition-shadow overflow-hidden rounded-lg h-full">
              <div className="flex flex-col items-center justify-center h-full p-20">
                <img src={card.image} alt="Card Image" className="mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-center">{card.title}</h3>
                <p className="text-gray-600 text-center">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* About Us Section */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto">
          <h2 className="text-4xl font-extrabold mb-8 text-center">About Us</h2>
          <p className="text-lg text-gray-700 leading-relaxed text-center max-w-3xl mx-auto">
            SkillSphere is a platform dedicated to providing high-quality online courses to learners worldwide. Our mission is to empower individuals to acquire new skills, pursue their passions, and achieve their career goals. Whether you're a student looking to explore diverse subjects or a professional aiming to enhance your expertise, SkillSphere offers a flexible and engaging learning experience tailored to your needs.
          </p>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
