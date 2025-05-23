'use client';
import ItemDeleteButton from './itemDeleteButton';
import ItemTextBox from './itemTextBox';

interface ItemCardProps {
  itemKey: string;
  value: number;
  max: number;
  onRefresh: () => void;
}

export default function ItemCard({ itemKey, value, max, onRefresh }: ItemCardProps) {
  return (
    <li className='relative border border-gray-200 rounded-lg shadow-md p-6 bg-white hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between'>
      <div className='absolute top-2 right-2'>
        <ItemDeleteButton itemKey={itemKey} onDelete={onRefresh} />
      </div>

      <div className='mb-6'>
        <h2 className='text-lg font-semibold text-gray-700 mb-2'>{itemKey}</h2>

        <div className='text-gray-700 mb-4'>
          <p>
            <strong>Quantity:</strong> {value}
            <span className='ml-4'><strong>Max:</strong> {max}</span>
          </p>
        </div>
      </div>

      <div className='mb-2'>
        <label className='block text-sm font-medium text-gray-700 mb-1 text-center'>Update Quantity</label>
        <div className='flex justify-between items-center gap-2'>
          <div className='flex-1 flex justify-center'>
            <ItemTextBox itemKey={itemKey} initialValue={value} onUpdate={onRefresh} />
          </div>
        </div>
      </div>
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1 text-center'>Update Max</label>
        <div className='flex justify-center'>
          <ItemTextBox itemKey={itemKey} initialValue={max} onUpdate={onRefresh} type="max" />
        </div>
      </div>

    </li>
  );
}