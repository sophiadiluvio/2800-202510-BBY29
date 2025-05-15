'use client';

import { plusItem } from "../actions/itemActions";

interface Prop {
  id?: string;
  newValue?: number;
  onUpdate: () => void;
}

export default function ItemMinusButton({ id, newValue, onUpdate }: Prop) {
  return (
    <button
      type="button"
      className="text-blue-600 hover:text-blue-800 transition-colors"
      onClick={async () => {
        if (!id) return;
        await plusItem(id, newValue); // Assuming plusItem handles both increment/decrement
        onUpdate();
      }}
    >
      ➖
    </button>
  );
}
