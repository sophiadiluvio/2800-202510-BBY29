'use client';
import { updateInvItem } from '@/app/actions/ItemActions';

interface ItemMinusButtonProps {
  itemKey: string;
  newValue: number;
  onUpdate: () => void;
}

export default function ItemMinusButton({ itemKey, newValue, onUpdate }: ItemMinusButtonProps) {
  return (
    <button
      type='button'
      className='text-red-600 hover:text-red-800 transition-colors'
      onClick={async () => {
        await updateInvItem(itemKey, newValue);
        onUpdate();
      }}
    >
      ➖
    </button>
  );
}

