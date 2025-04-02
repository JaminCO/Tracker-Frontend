"use client"

import { useState } from 'react';
import Head from 'next/head';
import Layout from '../components/layout/Layout';
import Hero from '../components/home/Hero';
import SearchBar from '../components/home/SearchBar';
import { AuthProvider } from '../context/AuthContext';

export default function Home() {

  return (
    <Layout>
      <Head>
        <title>Tracker - Find the best deals on refurbished devices</title>
        <meta name="description" content="Track prices, compare deals, and get AI-powered recommendations for refurbished devices." />
      </Head>
      <AuthProvider>
        <Hero />
        <SearchBar />
      </AuthProvider>
    </Layout>
  );
}