'use client';

import { plusItem } from "../actions/itemActions";

interface prop {
  id?: string;
  newValue?: number;
  onUpdate: () => void;
}

export default function ItemPlusButton({ id, newValue, onUpdate }: prop) {
  return (
    <button
      type="button"
      className="text-red-600 hover:text-red-800 transition-colors"
      onClick={async () => {
        if (!id) return;
        await plusItem(id, newValue);
        onUpdate();
      }}
    >
      ➕
    </button>
  );
}
