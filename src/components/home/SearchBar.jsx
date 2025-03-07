
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/products?search=${encodeURIComponent(query)}`);
    }
  };
  
return (
    <div className="w-[90%] max-w-3xl mx-auto -mt-6 relative px-4 sm:px-6">
      <form onSubmit={handleSearch} className="relative">
        <input
            type="text"
            className="w-full bg-black bg-opacity-80 text-white rounded-full py-3 sm:py-5 px-12 sm:px-16 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-30 placeholder-gray-400 border border-white"
            placeholder="Samsung Galaxy S24 Ultra"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        /> <button 
          type="submit"
          className="absolute left-3 sm:left-5 top-1/2 transform -translate-y-1/2 text-gray-400"
        >
          <Search size={20} className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </form>
    </div>
  );
}
