import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { AuthProvider } from '../../context/AuthContext';
import AuthModal from '../auth/AuthModal';
import RegModal from '../auth/RegModal';
import { Bell, User, Heart, Menu, X, ChevronDown, ChevronUp } from 'lucide-react';

export default function Header() {
    const [showMenu, setShowMenu] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);   
    const [showRegModal, setShowRegModal] = useState(false);   


    return (
        <AuthProvider>
        <header className="py-6 lg:px-20 md:px-5 px-5 container mx-auto">
            <div className="flex justify-between items-center">
                <Link href="/">
                    <span className="text-white text-3xl font-bold">Tracker</span>
                </Link>
                
                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-10">
                    <Link href="#" className="text-white hover:text-gray-200 mx-4">
                        Home
                    </Link>
                    <Link href="#" className="text-white hover:text-gray-200 mx-4">
                        Products
                    </Link>
                    <Link href="#" className="text-white hover:text-gray-200 mx-4">
                        Track Prices
                    </Link>
                </nav>
                
                {/* Desktop Icons */}
                <div className="hidden md:flex items-center space-x-4">
                    <button aria-label="Notifications" className="text-white mx-5">
                        <Bell size={24} />
                    </button>
                    <button aria-label="Profile" className="text-white mx-5" onClick={() => setShowProfile(!showProfile)}>
                        <User size={24} />
                    </button>
                    <button aria-label="Favorites" className="text-white mx-5">
                        <Heart size={24} />
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button 
                    className="md:hidden text-white"
                    onClick={() => setShowMenu(!showMenu)}
                >
                    {showMenu ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {showMenu && (
                <div className="md:hidden mt-4">
                    <nav className="flex flex-col space-y-4">
                        <Link href="#" className="text-white hover:text-gray-200">
                            Home
                        </Link>
                        <Link href="#" className="text-white hover:text-gray-200">
                            Products
                        </Link>
                        <Link href="#" className="text-white hover:text-gray-200">
                            Track Prices
                        </Link>
                    </nav>
                    <div className="flex space-x-4 mt-4">
                        <button aria-label="Notifications" className="text-white cursor-pointer">
                            <Bell size={24} />
                        </button>
                        <button aria-label="Profile" className="cursor-pointer text-white" onClick={() => setShowProfile(!showProfile)}>
                            <User size={24} />
                        </button>
                        <button aria-label="Favorites" className="text-white cursor-pointer">
                            <Heart size={24} />
                        </button>
                    </div>
                </div>
            )}

            {/* Profile Menu */}
            {showProfile && (
                <div className="absolute right-25 lg:right-20 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 z-10">
                    <div className="py-1">
                        <button onClick={() => setShowRegModal(true)} className=" cursor-pointer block px-4 py-2 text-sm text-white hover:bg-gray-700">
                            Signup
                        </button>
                        <button onClick={() => setShowAuthModal(true)} className="cursor-pointer block px-4 py-2 text-sm text-white hover:bg-gray-700">
                            Login
                        </button>
                        {showAuthModal && (
                        <AuthModal onClose={() => setShowAuthModal(false)} />
                        )}
                        {showRegModal && (
                        <RegModal onClose={() => setShowRegModal(false)} />
                    )}
                    </div>
                </div>
            )}
        </header>
        </AuthProvider>
    );
}