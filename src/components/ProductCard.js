'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function ProductCard({ product }) {
  return (
    <Link href={`/products/${product.id}`}>
      <div className="bg-white bg-opacity-5 rounded-lg p-6 hover:bg-opacity-10 transition-all cursor-pointer">
        <div className="relative h-48 w-full mb-4">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain"
          />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
        <p className="text-gray-300">Starting from £{Math.min(...product.prices.map(p => p.price))}</p>
      </div>
    </Link>
  );
} 