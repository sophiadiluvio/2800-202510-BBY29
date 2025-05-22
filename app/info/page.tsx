export default function InfoPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 bg-gray-50 text-gray-800">
      <section className="mb-12 text-center">
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

      <footer className="mt-12 text-center text-gray-500 text-sm">
        &copy; 2025 ShelterLink. Empowering communities through clarity and connection.
      </footer>
    </main>
  );
}
