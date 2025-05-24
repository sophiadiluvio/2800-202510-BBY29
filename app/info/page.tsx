// info page for new users, linked to a question mark button in the header

import Image from 'next/image';
import Header from '../components/navbar/noAccount/homepageHeader';
import Footer from '../components/navbar/noAccount/footer';

export default function InfoPage() {
  return (

    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
  <Header />
    
    <main className="max-w-4xl mx-auto px-6 py-12 bg-gray-50 text-gray-800">
        
    <section className="mb-12 text-center">
      
        <div className="mx-auto mb-6 w-40">
            <Image
            src="/logo_transparent.png"
            alt="ShelterLink Logo"
            width={160}
            height={160}
            layout="responsive"
            />
        </div>
        <h1 className="text-4xl font-bold mb-4 text-blue-700">Welcome to ShelterLink</h1>
        <p className="text-lg text-gray-600">
            Bridging the communication gap between shelters, volunteers, and those in need.
        </p>
    </section>

      <section className="bg-white p-6 rounded-lg shadow-md mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-blue-600">Why We Built This App</h2>
        <p className="text-gray-700 leading-relaxed">
          Many shelters struggle to share real-time updates about available resources like food, clothing,
          and medicine. Without a unified and accessible platform, it's difficult for volunteers to know where
          help is needed and for individuals in need to find accurate, up-to-date shelter information.
          This app empowers shelters to communicate efficiently, ensuring those who want to help, and those 
          who need help, can connect effectively.
        </p>
      </section>

      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-blue-600">How It Helps the Community</h2>
        <ul className="list-disc pl-5 text-gray-700 space-y-4">
          <li>
            <strong>Public Access to Item Status:</strong> 
            Anyone can view the current stock levels of various shelters
            to guide their decisions, whether they're seeking help or looking to offer support.
          </li>
          <li>
            <strong>Live Shelter Needs:</strong> Shelters can post what they are low on (e.g., food, socks, hygiene items),
            allowing community members to directly donate exactly what's needed.
          </li>
          <li>
            <strong>Informed Donations:</strong> View shelters in need of specific items so donors can act with purpose,
            not guesswork.
          </li>
        </ul>
      </section>

      <section className="bg-white p-6 rounded-lg shadow-md mt-10">
        <h2 className="text-2xl font-semibold mb-4 text-blue-600">What We Track and Why</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          We've identified ten key categories that reflect the most common needs shelters encounter — either as supplies they provide to individuals, or as resources they require to keep their services running. This focused approach makes it easier for shelters to communicate, and for the community to respond in meaningful ways.
        </p>
        <ul className="list-disc pl-5 text-gray-700 space-y-4">
          <li>
            <strong>Perishable food:</strong> Fresh meals, sandwiches, dairy, and produce offered directly to those in need of nourishment.
          </li>
          <li>
            <strong>Non-perishable food:</strong> Canned goods, pasta, rice, and long-lasting items that form the backbone of many food programs.
          </li>
          <li>
            <strong>Hygiene products:</strong> Essentials like soap, toothpaste, razors, and menstrual supplies — small items that restore dignity and comfort.
          </li>
          <li>
            <strong>Clothing & footwear:</strong> Items like socks, jackets, shoes, and gloves that help individuals stay dry, warm, and prepared for the weather.
          </li>
          <li>
            <strong>Bedding & linens:</strong> Towels, blankets, and pillows that offer a sense of comfort, often handed out or used in temporary housing.
          </li>
          <li>
            <strong>First aid & medical supplies:</strong> Bandages, masks, and over-the-counter medications that help shelters handle everyday health needs.
          </li>
          <li>
            <strong>Cleaning & household supplies:</strong> Disinfectants, paper products, and detergents — crucial for maintaining safe and sanitary spaces.
          </li>
          <li>
            <strong>Beds available:</strong> Tracks how many sleeping spaces a shelter currently has open, helping people find overnight support faster.
          </li>
          <li>
            <strong>Seasonal gear:</strong> Winter coats, rain ponchos, hand warmers, and sunscreen — practical items that match the weather and the season.
          </li>
          <li>
            <strong>Transportation & employment support:</strong> Resources like transit passes, phone cards, and résumé supplies that help people move forward with job searches or appointments.
          </li>
        </ul>
      </section>

      <footer className="mt-12 text-center text-gray-500 text-sm">

        &copy; 2025 ShelterLink. Empowering communities through clarity and connection.
      </footer>
      <div className="mt-6 space-y-3"></div>
      <Footer />
    </main>


    </div>

    
  );
}
