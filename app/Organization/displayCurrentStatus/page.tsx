'use client';

import { useState } from 'react';
// import ItemForm from '../components/ItemForm';
import ItemsList from '../../components/itemsList';

export default function CurrentStatusPage() {
  const [refresh, setRefresh] = useState<number>(0);

  const handleRefresh = () => {
    setRefresh((prev) => prev + 1);
  };

  return (
    <div className="p-6">
      {/* Always show the form */}
      {/* <ItemForm addedItem={handleRefresh} /> */}
      <ItemsList key={refresh} />
    </div>
    
  );
}
