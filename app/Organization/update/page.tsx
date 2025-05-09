'use client';

import { useState } from 'react';
import ItemForm from '../../components/itemForm';
import ItemsList from '../../components/itemsList';

export default function CurrentStatusPage() {
  const [refresh, setRefresh] = useState<number>(0);

  const handleRefresh = () => {
    setRefresh((prev) => prev + 1);
  };

  return (
    <div className="p-6">
      {/* Uncommented the ItemForm component */}
      <ItemForm addedItem={handleRefresh} />
      <ItemsList key={refresh} />
      
    </div>
  );
}
