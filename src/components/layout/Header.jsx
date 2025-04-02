import { useState } from 'react';
import Link from 'next/link';
import { AuthProvider } from '../../context/AuthContext';
import AuthModal from '../auth/AuthModal';
import RegModal from '../auth/RegModal';
import { Bell, User, Heart, Menu, X } from 'lucide-react';

export default function Header() {
    const [showMenu, setShowMenu] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);   
    const [showRegModal, setShowRegModal] = useState(false);   

    return (
        <AuthProvider>
        <header>
            {/* Desktop Navigation */}
            <nav className="flex justify-between items-center px-6 py-4 text-white">
                <div className="text-xl font-bold">Tracker</div>
                <div className="hidden md:flex space-x-4">
                    <Link href="#" className="hover:text-gray-300">Home</Link>
                    <Link href="#" className="hover:text-gray-300">Products</Link>
                    <Link href="#" className="hover:text-gray-300">Track Prices</Link>
                </div>
                <div className="hidden md:flex space-x-4">
                    <button className="hover:bg-purple-600 p-2 rounded">
                        <Bell size={20} />
                    </button>
                    <button 
                        className="hover:bg-purple-600 p-2 rounded" 
                        onClick={() => setShowProfile(!showProfile)}
                    >
                        <User size={20} />
                    </button>
                    <button className="hover:bg-purple-600 p-2 rounded">
                        <Heart size={20} />
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button 
                    className="md:hidden text-white"
                    onClick={() => setShowMenu(!showMenu)}
                >
                    {showMenu ? <X size={24} /> : <Menu size={24} />}
                </button>
            </nav>

            {/* Mobile Menu */}
            {showMenu && (
                <div className="md:hidden px-6 py-4 bg-gray-800">
                    <nav className="flex flex-col space-y-4">
                        <Link href="#" className="text-white hover:text-gray-300">
                            Home
                        </Link>
                        <Link href="#" className="text-white hover:text-gray-300">
                            Products
                        </Link>
                        <Link href="#" className="text-white hover:text-gray-300">
                            Track Prices
                        </Link>
                    </nav>
                    <div className="flex space-x-4 mt-4">
                        <button className="hover:bg-purple-600 p-2 rounded text-white">
                            <Bell size={20} />
                        </button>
                        <button 
                            className="hover:bg-purple-600 p-2 rounded text-white"
                            onClick={() => setShowProfile(!showProfile)}
                        >
                            <User size={20} />
                        </button>
                        <button className="hover:bg-purple-600 p-2 rounded text-white">
                            <Heart size={20} />
                        </button>
                    </div>
                </div>
            )}

            {/* Profile Menu */}
            {showProfile && (
                <div className="absolute right-6 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 z-10">
                    <div className="py-1">
                        <button 
                            onClick={() => setShowRegModal(true)} 
                            className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
                        >
                            Signup
                        </button>
                        <button 
                            onClick={() => setShowAuthModal(true)} 
                            className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
                        >
                            Login
                        </button>
                    </div>
                </div>
            )}

            {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
            {showRegModal && <RegModal onClose={() => setShowRegModal(false)} />}
        </header>
        </AuthProvider>
    );
}