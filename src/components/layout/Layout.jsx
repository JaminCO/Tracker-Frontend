// import { useRouter } from 'next/router';
import Header from './Header';

export default function Layout({ children }) {
  // const router = useRouter();
  
  return (
    <div className="min-h-screen bg-[#00083B]">
      <Header />
      <main className="container mx-auto px-4 pb-8">
        {children}
      </main>
    </div>
  );
}