'use client';

import { useEffect, useState } from 'react';
import ItemCard from './ItemCard';


interface Item {
  _id?: string;
  name: string;
  category: string;
  stock: number;
}

export default function ItemsList() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshKey, setRefreshKey] = useState<number>(0);

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await fetch('/api/shelter');
        const data: Item[] = await response.json();
        setItems(data);
      } catch (err) {
        console.error('Error fetching data: ', err);
      } finally {
        setLoading(false);
      }
    }

    fetchItems();
  }, [refreshKey]);

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6">Current Items</h1>

      {loading ? (
        <p>Loading items...</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <ItemCard key={index} item={item} onRefresh={() => setRefreshKey((prev) => prev + 1)} />

          ))}
        </ul>
      )}
    </div>
  );
}

