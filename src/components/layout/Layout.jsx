// import { useRouter } from 'next/router';
import Header from './Header';

export default function Layout({ children }) {
  // const router = useRouter();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-blue-900 to-blue-800 ">
      <Header />
      <main className="container mx-auto px-4 pb-8">
        {children}
      </main>
    </div>
  );
}