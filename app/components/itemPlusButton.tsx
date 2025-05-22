'use client';
import { updateInvItem } from '@/app/actions/ItemActions';

interface ItemPlusButtonProps {
  itemKey: string;
  newValue: number;
  onUpdate: () => void;
}

export default function ItemPlusButton({ itemKey, newValue, onUpdate }: ItemPlusButtonProps) {
  return (
    <button
      type='button'
      className='text-green-600 hover:text-green-800 transition-colors'
      onClick={async () => {
        await updateInvItem(itemKey, newValue);
        onUpdate();
      }}
    >
      ➕
    </button>
  );
}
