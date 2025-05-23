'use client';

import Header from "../../components/navbar/organization/header";
import Footer from "../../components/navbar/organization/footer";

import { useState } from 'react';
import ItemForm from '../../components/itemForm';
import ItemsList from '../../components/itemsList';

export default function CurrentStatusPage() {
  const [refresh, setRefresh] = useState<number>(0);

  const handleRefresh = () => {
    setRefresh((prev) => prev + 1);
  };

  return (
    <main className="min-h-screen bg-white text-black flex flex-col">
      <Header>
        <h1 className="text-xl font-bold ml-4">Update Items</h1>
      </Header>

      <div className="flex-1 p-6">
        <ItemForm addedItem={handleRefresh} />
        <ItemsList key={refresh} />
      </div>
      <div className="mt-10 space-y-3"></div>

      <Footer />
    </main>

  );
}
