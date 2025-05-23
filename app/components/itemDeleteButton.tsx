'use client';
import { deleteInvItem } from '@/app/actions/ItemActions';
import { IoCloseSharp } from "react-icons/io5";
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
      <IoCloseSharp size={30}/>
    </button>
  );
}
