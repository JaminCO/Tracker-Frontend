"use client";

import React, { useState } from 'react';
import { Heart, User } from 'lucide-react';
import Layout from '../../components/layout/Layout';


export default function PhoneTrackerPage() {
  const [phones] = useState([
    {
      name: 'Samsung Galaxy S24 Ultra 256GB Titanium Grey',
      price: 795,
      specs: '6.8 Inch Quad HD 200 MP 12 GB RAM 256 GB Android 14 5,000 mAh',
      image: '/phones/s24-ultra.jpeg'
    },
    {
      name: 'Samsung Galaxy S24 Ultra 256GB Titanium Grey',
      price: 810,
      specs: '6.8 Inch Quad HD 200 MP 12 GB RAM 256 GB Android 14 5,000 mAh',
      image: '/phones/s24-ultra.jpeg'
    },
    {
      name: 'Samsung Galaxy S24 Ultra 256GB Titanium Grey',
      price: 696,
      specs: '6.8 Inch Quad HD 200 MP 12 GB RAM 256 GB Android 14 5,000 mAh',
      image: '/phones/s24-ultra.jpeg',
      bestPrice: true
    }
  ]);

  return (
    <Layout>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Phones Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Phones</h1>
          <div className="h-1 bg-yellow-400 w-104 mx-auto"></div>
        </div>

        {/* Phone Cards */}
        <div className="grid grid-cols-3 gap-6 text-black">
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}