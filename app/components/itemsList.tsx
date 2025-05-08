'use client';

import { useEffect, useState } from 'react';

interface Item {
    _id?: string;
    name: string;
    // price: number;
    category: string;
    stock: number;
}

interface prop {
    refresh: number;
}

export default function itemsList() {
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [refreshKey, setRefreshKey] = useState<number>(0);

    useEffect(() => {
        async function fetchItems() {
            try {
                const response = await fetch('/api/shelter');
                const data: Item[] = await response.json();
                setItems(data);
            } catch (err) {
                console.error('Error fetching data: ', err);
            } finally {
                setLoading(false);
            }
        }
    
        fetchItems();
    }, [refreshKey]);
    

    console.log(items);

    return (
        <div>
            <h1 className="text-3xl font-extrabold text-gray-800 mb-6">Current Items</h1>

            {/* Show loading or item list */}
            {loading ? (
                <p>Loading items...</p>
            ) : (
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item, index) => (
                        <li
                            key={index}
                            className="border border-gray-200 rounded-lg shadow-md p-6 bg-white hover:shadow-lg transition-shadow duration-300 relative"
                        >
                            {/* Top-right delete button */}
                            {/* { <div className="absolute top-2 right-2">
                                <ItemDeleteButton id={item._id} onDelete={() => setRefreshKey((prev) => prev + 1)} />
                            </div>} */}

                            <h2 className="text-lg font-semibold text-gray-700 mb-2">{item.name}</h2>
                            <p className="text-gray-600">
                                <strong className="font-medium text-gray-800">Category:</strong> {item.category}
                            </p>
                            <p className="text-gray-600">
                                <strong className="font-medium text-gray-800">Stock:</strong> {item.stock}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

