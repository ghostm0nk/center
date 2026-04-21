import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { supabase } from '../lib/supabase';

function Header({ session }) {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error logging out:', error.message);
    } else {
      navigate('/login');
    }
  };

  return (
    <header className="bg-white shadow-md py-4 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors duration-200">
          Center
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">Home</Link>
          <Link to="/list" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">List Item</Link>
          {session ? (
            <>
              <Link to={`/profile/${session.user.id}`} className="text-gray-700 hover:text-blue-600 transition-colors duration-200">Profile</Link>
              <Link to="/settings" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">Settings</Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">Login</Link>
              <Link to="/register" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200">Register</Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-2"
            aria-label="Toggle navigation"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 bg-gray-50 rounded-md shadow-lg py-2">
          <Link to="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link to="/list" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => setIsMobileMenuOpen(false)}>List Item</Link>
          {session ? (
            <>
              <Link to={`/profile/${session.user.id}`} className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => setIsMobileMenuOpen(false)}>Profile</Link>
              <Link to="/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => setIsMobileMenuOpen(false)}>Settings</Link>
              <button
                onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
              <Link to="/register" className="block px-4 py-2 text-blue-600 hover:bg-gray-100" onClick={() => setIsMobileMenuOpen(false)}>Register</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;