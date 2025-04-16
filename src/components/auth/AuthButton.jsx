import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import AuthModal from './AuthModal';
import { ChevronDown, User, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';

export default function AuthButton() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogin = () => {
    setAuthMode('login');
    setShowAuthModal(true);
  };

  const handleSignup = () => {
    setAuthMode('signup');
    setShowAuthModal(true);
  };

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {isAuthenticated ? (
        <div className="flex items-center">
          <button
            onClick={toggleDropdown}
            className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span className="max-w-[150px] truncate">{user?.username || user?.email || 'User'}</span>
            <ChevronDown size={16} />
          </button>
          
          {showDropdown && (
            <div className="fixed mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-[100] transform origin-top-right" 
                 style={{ 
                   top: '60px', 
                   right: '20px' 
                 }}>
              <div className="py-1">
                <div className="px-4 py-3 text-sm text-gray-700 border-b border-gray-200">
                  <p className="font-medium truncate">{user?.username || user?.email}</p>
                  <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                </div>
                <Link 
                  href="/profile" 
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowDropdown(false)}
                >
                  <User size={16} className="mr-2" />
                  My Profile
                </Link>
                <Link 
                  href="/settings" 
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowDropdown(false)}
                >
                  <Settings size={16} className="mr-2" />
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <LogOut size={16} className="mr-2" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center space-x-4">
          <button
            onClick={handleLogin}
            className="px-4 py-2 text-sm font-medium text-indigo-600 bg-white border border-indigo-600 rounded-md hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Login
          </button>
          <button
            onClick={handleSignup}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Sign Up
          </button>
        </div>
      )}

      {showAuthModal && (
        <AuthModal 
          onClose={() => setShowAuthModal(false)}
          initialMode={authMode}
        />
      )}
    </div>
  );
} 