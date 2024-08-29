import { useState } from 'react';
import { FiMenu } from 'react-icons/fi';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          {/* <img
            src="/logo.png" 
            alt="Logo"
            className="h-8 w-8 mr-2"
          /> */}
          <span className="text-white text-lg font-semibold">YourAppName</span>
        </div>

        <div className="hidden md:flex space-x-4">
          <button className="text-white bg-blue-500 px-4 py-2 rounded-md">Login</button>
          <button className="text-white bg-blue-700 px-4 py-2 rounded-md">Sign Up</button>
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            <FiMenu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="flex flex-col space-y-2 mt-2">
            <button className="text-white bg-blue-500 px-4 py-2 rounded-md">Login</button>
            <button className="text-white bg-blue-700 px-4 py-2 rounded-md">Sign Up</button>
          </div>
        </div>
      )}
    </nav>
  );
}
