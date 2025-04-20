import Link from 'next/link';
import Image from "next/image";

export default function Hero() {
return (
    <section className="flex flex-col md:flex-row items-center justify-between py-12 md:py-20 lg:px-15 ">
        <div className="md:w-1/2 mb-10 md:mb-0">
        <Image
          className="dark:invert w-full h-auto rounded-lg shadow-lg"
          src="/trackr-landing.png"
          alt="Product tracking illustration"
          width={200}
          height={200}
          priority
        />
        </div>
        
        <div className="md:w-1/2 text-white text-center md:text-right">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                Analyse prices,<br />
                discover<br />
                the best deals
            </h1>
            
            <div className="h-0.5 lg:w-90 md:w-60 bg-white mb-6 mx-auto md:ml-auto md:mr-0"></div>
            
            <p className="lg:text-[16px] md:text-[18px] opacity-90 mb-8">
                Track a product's price history and visualize
                trends instantly.<br />
                Unlock the best offers at the right time
            </p>
        </div>
    </section>
);
}
