'use client';
import ItemDeleteButton from './itemDeleteButton';
import ItemPlusButton from './itemPlusButton';
import ItemMinusButton from './itemMinusButton';
import ItemTextBox from './itemTextBox';

interface ItemCardProps {
  itemKey: string;
  value: number;
  onRefresh: () => void;
}

export default function ItemCard({ itemKey, value, onRefresh }: ItemCardProps) {
  return (
    <li className='relative border border-gray-200 rounded-lg shadow-md p-6 bg-white hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between'>
      <div className='absolute top-2 right-2'>
        <ItemDeleteButton itemKey={itemKey} onDelete={onRefresh} />
      </div>

      <div className='mb-6'>
        <h2 className='text-lg font-semibold text-gray-700 mb-2'>{itemKey}</h2>
        <p className='text-gray-600'>
          <strong className='font-medium text-gray-800'>Quantity:</strong> {value}
        </p>
      </div>

      <div className='mt-auto flex justify-between items-center gap-2 pt-4'>
        <ItemMinusButton itemKey={itemKey} newValue={Math.max(0, value - 1)} onUpdate={onRefresh} />
        <div className='flex-1 flex justify-center'>
          <ItemTextBox itemKey={itemKey} initialValue={value} onUpdate={onRefresh} />
        </div>
        <ItemPlusButton itemKey={itemKey} newValue={value + 1} onUpdate={onRefresh} />
      </div>
    </li>
  );
}