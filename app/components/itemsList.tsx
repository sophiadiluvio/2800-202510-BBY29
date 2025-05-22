'use client';
import { useEffect, useState } from 'react';
import ItemCard from './ItemCard';

interface Item {
  key: string;
  value: number;
  max: number;
}

export default function ItemsList() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    async function fetchItems() {
      try {
        const res = await fetch('/api/userShelter');
        const data = await res.json();
        const shelter = data.userShelter;
        if (shelter?.inv) {
          const invItems = Object.entries(shelter.inv).map(([key, value]) => {
            const maxValue = shelter.max?.[key] ?? 0;
            return { key, value: value as number, max: maxValue };
          });

          setItems(invItems);
        }
      } catch (e) {
        console.error('Error fetching shelter items', e);
        setItems([]);
      } finally {
        setLoading(false);
      }
    }
    fetchItems();
  }, [refreshKey]);

  return (
    <div>
      <h1 className='text-3xl font-extrabold text-gray-800 mb-6'>Current Items</h1>
      {loading ? (
        <p>Loading items...</p>
      ) : (
        <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {items.map(item => (
           <ItemCard key={item.key} itemKey={item.key} value={item.value} max={item.max} onRefresh={() => setRefreshKey(prev => prev + 1)} />
          ))}
        </ul>
      )}
    </div>
  );
}

