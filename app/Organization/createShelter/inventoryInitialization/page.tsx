'use client';

import { useState, useEffect } from 'react';
import { setInitialInventory } from '../../../actions/ItemActions';
import Header from '../../../components/navbar/organization/header';
import { useRouter } from 'next/navigation';

const SHELTER_CATEGORIES = [
  'Perishable food',
  'Non-perishable food',
  'Hygiene products',
  'Clothing & footwear',
  'Bedding & linens',
  'First aid & medical supplies',
  'Cleaning & household supplies',
  'Beds available',
  'Seasonal gear',
  'Transportation & employment support'
] as const;

const CATEGORIES_WITHOUT_REQUEST = [
  'Beds available',
  'Transportation & employment support'
];

export default function InventoryInitializationPage() {
  const router = useRouter();
  const [shelter, setShelter] = useState<any>(null);
  const [inventoryList, setInventoryList] = useState<Record<string, { current: string; requested: string; max: string }>>({});
  const [selectedCategory, setSelectedCategory] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchShelter() {
      const res = await fetch('/api/userShelter');
      const data = await res.json();
      setShelter(data.userShelter);
    }
    fetchShelter();
  }, []);

  const handleAddCategory = () => {
    if (selectedCategory && !(selectedCategory in inventoryList)) {
      setInventoryList({
        ...inventoryList,
        [selectedCategory]: { current: '', requested: '', max: '' }
      });
    }
    setSelectedCategory('');
  };

  const handleRemoveCategory = (category: string) => {
    const updated = { ...inventoryList };
    delete updated[category];
    setInventoryList(updated);
  };

  const handleChange = (category: string, field: 'current' | 'requested' | 'max', value: string) => {
    setInventoryList({
      ...inventoryList,
      [category]: {
        ...inventoryList[category],
        [field]: value
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    for (const [category, values] of Object.entries(inventoryList)) {
      const current = parseInt(values.current);
      const max = parseInt(values.max);
      formData.append(`inv[${category}]`, current.toString());
      formData.append(`max[${category}]`, max.toString());

      if (!CATEGORIES_WITHOUT_REQUEST.includes(category)) {
        const requested = values.requested ? parseInt(values.requested) : (max - current);
        formData.append(`req[${category}]`, requested.toString());
      }
    }

    try {
      await setInitialInventory(formData);
      setMessage('✅ Inventory successfully saved!');
      router.push('/Organization');
    } catch (err) {
      setMessage('❌ Something went wrong. Please try again.');
    }
  };

  return (
    <main className="min-h-screen bg-white text-black font-sans flex flex-col">
      <Header>
        <h1 className="text-xl font-bold">ShelterLink</h1>
      </Header>

      <div className="flex flex-col items-center justify-center flex-grow mt-10 space-y-4 text-center">
        <h2 className="text-lg font-semibold text-blue-600">
          Initialize Inventory for {shelter?.name || '...'}
        </h2>

        {message && <p className="text-green-600 font-medium">{message}</p>}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 items-center w-full px-4 max-w-md"
        >
          <div className="flex gap-2 items-center">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-gray-200 px-4 py-2 rounded"
            >
              <option value="">Select Category</option>
              {SHELTER_CATEGORIES.filter(c => !(c in inventoryList)).map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <button
              type="button"
              onClick={handleAddCategory}
              className="bg-green-500 text-white px-4 py-1 rounded"
            >
              Add
            </button>
          </div>

          <div className="flex flex-col space-y-2">
            {Object.entries(inventoryList).map(([category, values]) => (
              <div
                key={category}
                className="flex flex-wrap md:flex-nowrap gap-2 items-center border border-gray-400 rounded-md p-3 bg-white shadow-sm w-full"
              >
                <span className="flex-shrink-0 w-full md:w-40 font-medium text-gray-800 text-left">
                  {category}
                </span>

                <input
                  type="number"
                  value={values.current}
                  onChange={(e) => handleChange(category, 'current', e.target.value)}
                  placeholder="Current"
                  className="flex-1 min-w-[5rem] px-2 py-1 border border-gray-400 bg-gray-100 rounded text-gray-900"
                  required
                />

                {!CATEGORIES_WITHOUT_REQUEST.includes(category) && (
                  <input
                    type="number"
                    value={values.requested}
                    onChange={(e) => handleChange(category, 'requested', e.target.value)}
                    placeholder="Requested (opt)"
                    className="flex-1 min-w-[8rem] px-2 py-1 border border-gray-400 bg-gray-100 rounded text-gray-900"
                  />
                )}

                <input
                  type="number"
                  value={values.max}
                  onChange={(e) => handleChange(category, 'max', e.target.value)}
                  placeholder="Max"
                  className="flex-1 min-w-[5rem] px-2 py-1 border border-gray-400 bg-gray-100 rounded text-gray-900"
                  required
                />

                <button
                  type="button"
                  onClick={() => handleRemoveCategory(category)}
                  className="text-red-600 text-xl font-bold px-1"
                >
                  ❌
                </button>
              </div>
            ))}
          </div>

          <button type="submit" className="bg-blue-600 text-white py-2 px-8 rounded mt-4">
            Save Inventory
          </button>
        </form>
      </div>
    </main>
  );
}
