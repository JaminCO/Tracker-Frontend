"use client"


import { useState } from 'react';
import Head from 'next/head';
import Layout from '../components/layout/Layout';
import Hero from '../components/home/Hero';
import SearchBar from '../components/home/SearchBar';
// import AuthModal from '../components/auth/AuthModal';

export default function Home() {
  // const [showAuthModal, setShowAuthModal] = useState(false);
  
  return (
    <Layout>
      <Head>
        <title>Tracker - Find the best deals on refurbished devices</title>
        <meta name="description" content="Track prices, compare deals, and get AI-powered recommendations for refurbished devices." />
      </Head>
      
      <Hero />
      <SearchBar />
      
      {/* {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )} */}
    </Layout>
  );
}