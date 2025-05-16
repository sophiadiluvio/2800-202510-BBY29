'use client';

import { deleteItem } from "../actions/ItemActions";

interface prop {
  id?: string;
  onDelete: () => void;
}

export default function ItemDeleteButton({ id, onDelete }: prop) {
  return (
    <button
      type="button"
      className="text-red-600 hover:text-red-800 transition-colors"
      onClick={async () => {
        if (!id) return;
        await deleteItem(id);
        onDelete();
      }}
    >
      🗑️
    </button>
  );
}
