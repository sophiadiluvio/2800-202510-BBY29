'use client';
import { deleteInvItem } from '@/app/actions/ItemActions';

interface ItemDeleteButtonProps {
  itemKey: string;
  onDelete: () => void;
}

export default function ItemDeleteButton({ itemKey, onDelete }: ItemDeleteButtonProps) {
  return (
    <button
      type='button'
      className='text-gray-500 hover:text-gray-700 transition-colors'
      onClick={async () => {
        await deleteInvItem(itemKey);
        onDelete();
      }}
    >
      🗑️
    </button>
  );
}
