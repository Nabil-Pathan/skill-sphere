import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-6 md:p-20">
      <div className="container mx-auto flex flex-wrap justify-between">
        <div className="md:w-1/2 mb-6 md:mb-0">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Skill Sphere</h2>
          <p className="text-gray-400">Learn. Create. Succeed. Unlock your potential .</p>
        </div>

        <div className="w-full md:w-1/2 mb-6 md:mb-0 flex flex-wrap">
          <div className="w-full md:w-1/2 mb-6 md:mb-0">
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="list-none p-0">
              <li className="mb-2">
                <a href="#" className="hover:text-gray-300 transition duration-300">Home</a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-gray-300 transition duration-300">About Us</a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-gray-300 transition duration-300">Courses</a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-gray-300 transition duration-300">Contact</a>
              </li>
            </ul>
          </div>

          <div className="w-full md:w-1/2 mb-6 md:mb-0">
            <h3 className="text-xl font-semibold mb-4">Latest Courses</h3>
            <ul className="list-none p-0">
              <li className="mb-2">
                <a href="#" className="hover:text-gray-300 transition duration-300">Web Development Masterclass</a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-gray-300 transition duration-300">Digital Marketing Fundamentals</a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-gray-300 transition duration-300">Data Science Bootcamp</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-full mb-6 md:mb-0">
          <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
          <p className="text-gray-400 mb-4">Stay updated with our latest news and offerings.</p>
          
          <div className="flex flex-col md:flex-row gap-2 md:w-1/2 sm:w-full">
            <input type="text" placeholder='Your Email' className="w-full md:w-3/4 p-2" />
            <button className='w-full md:w-1/4 p-2 bg-green-600 hover:bg-green-500 text-white transition duration-300 font-bold'>Connect</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
