import Image from 'next/image';
import Link from 'next/link';
import Header from './components/navbar/noAccount/homepageHeader';
import Footer from './components/navbar/noAccount/footer';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">

      <main className="flex-1 max-w-2xl mx-auto px-6 py-12 text-center">
        <div className="mx-auto mb-8 w-40">
          <Image
            src="/logo_transparent.png"
            alt="ShelterLink Logo"
            width={160}
            height={160}
            layout="responsive"
          />
        </div>

        <h1 className="text-5xl font-bold text-blue-500 mb-4">404 – Page Not Found</h1>
        <p className="text-lg text-gray-600 mb-8">
          Oops! We couldn’t find the page you were looking for.
        </p>

        <Link href="/">
          <span className="inline-block bg-blue-500 text-white px-6 py-3 rounded shadow hover:bg-blue-700 transition">
            Go back
          </span>
        </Link>
      </main>
      <footer className="mt-12 text-center text-gray-500 text-sm">

        &copy; 2025 ShelterLink. Empowering communities through clarity and connection.
      </footer>
      <div className="mt-3 space-y-3"></div>


    </div>
    
  );
}
