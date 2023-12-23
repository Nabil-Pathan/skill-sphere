import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex items-start justify-center md:items-center mt-24 relative">
      <div className="text-center relative z-10 px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Welcome to SkillSphere</h1>
        <p className="text-lg md:text-xl mb-8">
          Learn. Create. Succeed. Unlock your potential with SkillSphere.
        </p>
        <Link to="/signup">
          <button className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-8 rounded-full transition duration-300">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
