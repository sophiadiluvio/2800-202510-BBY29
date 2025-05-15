'use client';

import Header from '../../components/navbar/communityMember/header';
import Footer from '../../components/navbar/communityMember/footer';

const mockShelters = [
  { name: 'Shelter A', capacity: 25, food: 12, blankets: 5 },
  { name: 'Shelter B', capacity: 40, food: 20, blankets: 10 },
  { name: 'Shelter C', capacity: 30, food: 15, blankets: 8 },
  { name: 'Shelter D', capacity: 50, food: 25, blankets: 15 },
];

export default function DonationsNeededPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <Header>
        <h1 className="text-xl font-bold">Donations Needed</h1>
      </Header>

      <main className="flex-1 px-6 py-4 space-y-6">
        {/* Housing Shelters Section */}
        <section className="bg-gray-200 p-4 rounded-md">
          <h2 className="text-lg font-bold mb-2">Housing Shelters</h2>
          {mockShelters.map((shelter, index) => (
            <div key={`housing-${index}`} className="flex justify-between py-1 text-sm">
              <span>{shelter.name}</span>
              <span>Capacity: {shelter.capacity}</span>
              <span>Food: {shelter.food}</span>
              <span>Blankets: {shelter.blankets}</span>
            </div>
          ))}
        </section>

        {/* Food Bank Shelters Section */}
        <section className="bg-gray-200 p-4 rounded-md">
          <h2 className="text-lg font-bold mb-2">Food Bank Shelters</h2>
          {mockShelters.map((shelter, index) => (
            <div key={`foodbank-${index}`} className="flex justify-between py-1 text-sm">
              <span>{shelter.name}</span>
              <span>Capacity: {shelter.capacity}</span>
              <span>Food: {shelter.food}</span>
              <span>Blankets: {shelter.blankets}</span>
            </div>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
}