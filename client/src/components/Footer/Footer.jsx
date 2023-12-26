import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-6 md:p-20">
      <div className="container mx-auto flex flex-wrap justify-between">
        <div className="md:w-1/2 mb-6 md:mb-0">
          <h2 className="text-2xl flex gap-1 items-center  md:text-3xl font-bold mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
</svg>
            Skill Sphere
            </h2>
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
