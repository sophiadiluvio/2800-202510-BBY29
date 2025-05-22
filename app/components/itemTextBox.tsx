'use client';
import { useState } from 'react';
import { updateInvItem } from '@/app/actions/ItemActions';

interface ItemTextBoxProps {
  itemKey: string;
  initialValue: number;
  onUpdate: () => void;
}

export default function ItemTextBox({ itemKey, initialValue, onUpdate }: ItemTextBoxProps) {
  const [stockInput, setStockInput] = useState(initialValue);

  const handleUpdate = async () => {
    await updateInvItem(itemKey, stockInput);
    onUpdate();
  };

  return (
    <div className='mt-2 flex items-center space-x-2'>
      <input
        type='number'
        min='0'
        className='w-20 px-2 py-1 border rounded'
        value={stockInput}
        onChange={(e) => setStockInput(parseInt(e.target.value, 10))}
      />
      <button className='bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600' onClick={handleUpdate}>
        Set
      </button>
    </div>
  );
}

