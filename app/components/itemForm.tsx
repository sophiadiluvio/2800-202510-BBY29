'use client';
import { useState, useEffect } from 'react';
import { createInvItem } from '@/app/actions/ItemActions';
import { createMaxItem } from '@/app/actions/ItemActions';
import { SHELTER_CATEGORIES } from '@/app/types/shelterCategories';

interface ItemFormProps {
  addedItem: () => void;
}

export default function ItemForm({ addedItem }: ItemFormProps) {
  const [showForm, setShowForm] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [itemKey, setItemKey] = useState('');
  const [quantity, setQuantity] = useState<string>('0');
  const [existingKeys, setExistingKeys] = useState<string[]>([]);
  const [max, setMax] = useState<string>('0');


  useEffect(() => {
    async function fetchExistingItems() {
      try {
        const res = await fetch('/api/userShelter');
        const data = await res.json();
        const inv = data?.userShelter?.inv ?? {};
        setExistingKeys(Object.keys(inv));
      } catch (err) {
        console.error('Error fetching inventory:', err);
      }
    }
    fetchExistingItems();
  }, []);

  const toggleForm = () => setShowForm(prev => !prev);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set('quantity', parseInt(quantity, 10).toString());
    formData.set('max', parseInt(max, 10).toString());
    e.currentTarget.reset();
    await createInvItem(formData);
    await createMaxItem(formData);
    addedItem();
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
    setItemKey('');
    setQuantity('0');
    setMax('0');
  };

  return (
    <div className='mb-8 relative'>
      <button
        onClick={toggleForm}
        type='button'
        className='mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition'
      >
        Add Item
      </button>

      {showPopup && (
        <div className='absolute top-0 right-0 bg-green-500 text-white px-4 py-2 rounded shadow-md animate-fade-in-out z-10'>
          Item added!
        </div>
      )}

      <div className={`transition-all duration-500 ease-out overflow-hidden ${showForm ? 'max-h-[1000px] translate-y-0 opacity-100' : 'max-h-0 -translate-y-10 opacity-0'}`}>
        <form onSubmit={handleSubmit} className='bg-white p-6 rounded-lg shadow-md'>
          <h2 className='text-2xl font-bold mb-4 text-sky-500'>Add New Item</h2>
          <div className='mb-4'>
            <div className='mb-4'>
              <label className='block mb-1 text-sky-500'>Item Type</label>
              <select
                name='itemKey'
                value={itemKey}
                required
                onChange={(e) => setItemKey(e.target.value)}
                className='border px-3 py-2 w-full rounded text-black'
              >
                <option value='' disabled>Select a category</option>
                {SHELTER_CATEGORIES.filter(cat => !existingKeys.includes(cat)).map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

          </div>
          <div className='mb-4 text-sky-500'>
            <label className='block mb-1'>Quantity</label>
            <input
              type='number'
              name='quantity'
              value={quantity}
              required
              onChange={(e) => setQuantity(e.target.value)}
              className='border px-3 py-2 w-full rounded text-black'
            />
          </div>
          <div className='mb-4 text-sky-500'>
            <label className='block mb-1'>Max</label>
            <input
              type='number'
              name='max'
              value={max}
              required
              onChange={(e) => setMax(e.target.value)}
              className='border px-3 py-2 w-full rounded text-black'
            />
          </div>

          <button type='submit' className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition'>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
