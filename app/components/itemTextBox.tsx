'use client';

import { useState } from "react";
import { plusItem } from "../actions/ItemActions";

interface ItemTextBoxProps {
  id?: string;
  initialStock: number;
  onUpdate: () => void;
}

export default function ItemTextBox({ id, initialStock, onUpdate }: ItemTextBoxProps) {
  const [stockInput, setStockInput] = useState(initialStock);

  const handleUpdate = async () => {
    if (!id || isNaN(stockInput)) return;

    try {
      await plusItem(id, stockInput); // `plusItem` is reused to update any stock value
      onUpdate();
    } catch (err) {
      console.error("Failed to update stock:", err);
    }
  };

  return (
    <div className="mt-2 flex items-center space-x-2">
      <input
        type="number"
        min="0"
        className="w-20 px-2 py-1 border rounded"
        value={stockInput}
        onChange={(e) => setStockInput(parseInt(e.target.value))}
      />
      <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600" onClick={handleUpdate}>
        Save
      </button>
    </div>
  );
}


