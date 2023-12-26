import React from 'react';

const ContactPage = () => {
  return (
    <div className="md:min-h-screen w-full  flex items-center justify-center">
      <div className="bg-white p-8 rounded-md custom-shadow w-full  md:w-[40%] ">
        <h1 className="text-3xl font-extrabold mb-4 text-center text-gray-800">
          Contact Us
        </h1>
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-semibold text-gray-600">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              placeholder="John Doe"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-600">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              placeholder="john@example.com"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-semibold text-gray-600">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              className="w-full border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Write your message here..."
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-500 p-4 rounded-md text-white font-bold text-1/2xl"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
