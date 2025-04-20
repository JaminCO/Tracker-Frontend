"use client";

import React, { useState, useEffect } from 'react';
import { Heart, User } from 'lucide-react';
import Layout from '../../components/layout/Layout';
import { useSearchParams } from 'next/navigation';
import axios from 'axios'; // Import axios at the top

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px]">
      <div className="relative w-24 h-24">
        <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-t-blue-500 border-r-purple-500 border-b-yellow-400 border-l-green-500 animate-spin"></div>
        <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-t-transparent border-r-transparent border-b-transparent border-l-transparent animate-pulse">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full"></div>
        </div>
      </div>
      <p className="mt-6 text-xl text-white font-medium">Loading deals...</p>
    </div>
  );
};

export default function PhoneTrackerPage() {
  const searchParams = useSearchParams();
  const deviceName = searchParams.get('device') || 'samsung galaxy s24 ultra';
  const [phones, setPhones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPhones = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://tracker-api-lojg.onrender.com/api/scrape?device_name=${deviceName}`);
        
        if (response.status !== 200) {
          throw new Error('Failed to fetch data');
        }
        
        const data = response.data;
        
        // Transform the API response into the format we need
        const transformedPhones = [];
        
        // Add the best price first
        if (data.best) {
          transformedPhones.push({
            name: data.best.title,
            price: parseFloat(data.best.price),
            specs: '6.8 Inch Quad HD 200 MP 12 GB RAM 256 GB Android 14 5,000 mAh', // This would come from API in a real app
            image: data.best.image_url,
            bestPrice: true,
            vendor: data.best.vendor,
            url: data.best.device_url
          });
        }
        
        // Add the other products
        if (data.products && data.products.length > 0) {
          data.products.forEach(product => {
            transformedPhones.push({
              name: product.title,
              price: parseFloat(product.price),
              specs: '6.8 Inch Quad HD 200 MP 12 GB RAM 256 GB Android 14 5,000 mAh', // This would come from API in a real app
              image: product.image_url,
              bestPrice: false,
              vendor: product.vendor,
              url: product.device_url
            });
          });
        }
        
        setPhones(transformedPhones);
        setError(null);
      } catch (err) {
        console.error('Error fetching phones:', err);
        setError('Failed to load phone data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPhones();
  }, [deviceName]);

  return (
    <Layout>
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Phones Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Phones</h1>
          <div className="h-1 bg-yellow-400 w-104 mx-auto"></div>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-xl text-red-400">{error}</p>
          </div>
        ) : phones.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-300">No phones found</p>
          </div>
        ) : (
          /* Phone Cards */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-black">
            {phones.map((phone, index) => (
              <div 
                key={index} 
                className={`
                  bg-white rounded-lg shadow-lg p-4 relative
                  ${phone.bestPrice ? 'border-4 border-yellow-400' : ''}
                `}
              >
                {phone.bestPrice && (
                  <div className="absolute top-2 right-2 bg-yellow-400 text-black px-2 py-1 rounded">
                    Best Price
                  </div>
                )}
                <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded">
                  {phone.vendor}
                </div>
                <div className="text-center mb-2">
                  <span className="text-3xl font-bold">£{phone.price}</span>
                </div>
                <img 
                  src={phone.image} 
                  alt={phone.name} 
                  className="w-full h-64 object-contain mb-4"
                />
                <div className="text-center">
                  <h2 className="text-xl font-bold">{phone.name}</h2>
                  <p className="text-gray-600 mt-2">{phone.specs}</p>
                  <a 
                    href={phone.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors"
                  >
                    View Deal
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}