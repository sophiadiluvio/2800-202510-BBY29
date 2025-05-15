'use client';

import ItemDeleteButton from './itemDeleteButton';
import ItemPlusButton from './itemPlusButton';
import ItemMinusButton from './itemMinusButton'; 
import ItemTextBox from './itemTextBox';

interface Item {
  _id?: string;
  name: string;
  category: string;
  stock: number;
}

interface ItemCardProps {
  item: Item;
  onRefresh: () => void;
}

export default function ItemCard({ item, onRefresh }: ItemCardProps) {
  return (
    <li className="border border-gray-200 rounded-lg shadow-md p-6 bg-white hover:shadow-lg transition-shadow duration-300 relative">
      {/* Delete button */}
      <div className="absolute top-2 right-2">
        <ItemDeleteButton id={item._id} onDelete={onRefresh} />
      </div>

      {/* Plus & Minus buttons */}
      <div className="absolute top-2 left-2 flex space-x-2">
        <ItemPlusButton id={item._id} newValue={item.stock + 1} onUpdate={onRefresh} />
        <ItemMinusButton id={item._id} newValue={Math.max(0, item.stock - 1)} onUpdate={onRefresh} />
      </div>

      <div>
      <ItemTextBox id={item._id} initialStock={item.stock} onUpdate={onRefresh} />
      </div>

      <h2 className="text-lg font-semibold text-gray-700 mb-2">{item.name}</h2>
      <p className="text-gray-600">
        <strong className="font-medium text-gray-800">Category:</strong> {item.category}
      </p>
      <p className="text-gray-600">
        <strong className="font-medium text-gray-800">Stock:</strong> {item.stock}
      </p>
    </li>
  );
}
