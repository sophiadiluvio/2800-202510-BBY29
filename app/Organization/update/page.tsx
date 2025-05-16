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
    <main>
    <Header>
      <h1 className="text-xl font-bold ml-4">Update Status</h1>
    </Header>
    
    <div className="p-6">
      {/* Uncommented the ItemForm component */}
      <ItemForm addedItem={handleRefresh} />
      <ItemsList key={refresh} />
      
    </div>

    <Footer />
    </main>
  );
}
