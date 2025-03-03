import { useState } from 'react';
import Link from 'next/link';
import { Bell, User, Heart, Menu, X } from 'lucide-react';

export default function Header() {
    const [showMenu, setShowMenu] = useState(false);
    
    return (
        <header className="py-6 lg:px-20 md:px-5 container mx-auto">
            <div className="flex justify-between items-center">
                <Link href="/">
                    <span className="text-white text-3xl font-bold">Tracker</span>
                </Link>
                
                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-10">
                    <Link href="/" className="text-white hover:text-gray-200 mx-4">
                        Home
                    </Link>
                    <Link href="/products" className="text-white hover:text-gray-200 mx-4">
                        Products
                    </Link>
                    <Link href="/track-prices" className="text-white hover:text-gray-200 mx-4">
                        Track Prices
                    </Link>
                </nav>
                
                {/* Desktop Icons */}
                <div className="hidden md:flex items-center space-x-4">
                    <button aria-label="Notifications" className="text-white mx-5">
                        <Bell size={24} />
                    </button>
                    <button aria-label="Profile" className="text-white mx-5">
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
                        <Link href="/" className="text-white hover:text-gray-200">
                            Home
                        </Link>
                        <Link href="/products" className="text-white hover:text-gray-200">
                            Products
                        </Link>
                        <Link href="/track-prices" className="text-white hover:text-gray-200">
                            Track Prices
                        </Link>
                    </nav>
                    <div className="flex space-x-4 mt-4">
                        <button aria-label="Notifications" className="text-white">
                            <Bell size={24} />
                        </button>
                        <button aria-label="Profile" className="text-white">
                            <User size={24} />
                        </button>
                        <button aria-label="Favorites" className="text-white">
                            <Heart size={24} />
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}
