import { useState } from 'react';
import Link from 'next/link';
import { AuthProvider } from '@/context/AuthContext';
import AuthButton from '@/components/auth/AuthButton';
import { Bell, Heart, Menu, X } from 'lucide-react';

export default function Header() {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <AuthProvider>
        <header>
            {/* Desktop Navigation */}
            <nav className="flex justify-between items-center px-6 py-4 text-white">
                <Link href="/" className="text-xl font-bold">Trackr</Link>
                <div className="hidden md:flex space-x-4">
                    <Link href="/" className="hover:text-gray-300">Home</Link>
                    <Link href="#" className="hover:text-gray-300">Products</Link>
                    <Link href="/" className="hover:text-gray-300">Track Prices</Link>
                </div>
                <div className="hidden md:flex items-center space-x-4">
                    <button className="hover:bg-purple-600 p-2 rounded">
                        <Bell size={20} />
                    </button>
                    <button className="hover:bg-purple-600 p-2 rounded">
                        <Heart size={20} />
                    </button>
                    <AuthButton />
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
                        <Link href="/" className="text-white hover:text-gray-300">
                            Home
                        </Link>
                        <Link href="#" className="text-white hover:text-gray-300">
                            Products
                        </Link>
                        <Link href="/" className="text-white hover:text-gray-300">
                            Track Prices
                        </Link>
                    </nav>
                    <div className="flex space-x-4 mt-4">
                        <button className="hover:bg-purple-600 p-2 rounded text-white">
                            <Bell size={20} />
                        </button>
                        <button className="hover:bg-purple-600 p-2 rounded text-white">
                            <Heart size={20} />
                        </button>
                    </div>
                    <div className="mt-4">
                        <AuthButton />
                    </div>
                </div>
            )}
        </header>
        </AuthProvider>
    );
}