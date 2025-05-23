'use client';
import { useState } from 'react';
import { updateInvItem } from '@/app/actions/ItemActions';
import { updateMaxItem } from '@/app/actions/ItemActions';

interface ItemTextBoxProps {
  itemKey: string;
  initialValue: number;
  type?: 'inv' | 'max';
  onUpdate: () => void;
}

export default function ItemTextBox({ itemKey, initialValue, onUpdate, type = 'inv' }: ItemTextBoxProps) {
  const [stockInput, setStockInput] = useState(initialValue.toString());

const handleUpdate = async () => {
  const parsed = parseInt(stockInput, 10);
  if (isNaN(parsed) || parsed < 0) {
    alert('Please enter a valid number.');
    return;
  }

  try {
    if (type === 'max') {
      await updateMaxItem(itemKey, parsed);
    } else {
      await updateInvItem(itemKey, parsed);
    }

    onUpdate();
  } catch (err: any) {
    alert(err.message || 'Update failed.');
  }
};


  return (
    <div className='mt-2 flex items-center space-x-2'>
      <input
        type='number'
        min='0'
        className='w-20 px-2 py-1 border rounded'
        value={stockInput}
        onChange={(e) => setStockInput(e.target.value)}
      />
      <button className='bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600' onClick={handleUpdate}>
        Set
      </button>
    </div>
  );
}

