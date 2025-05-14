'use client';

import React, { useEffect, useState } from 'react';
import type { Shelter } from '../types/shelter'; // ✅ shared type

type Props = {
  onSelect?: (shelter: Shelter) => void;
  onSearchConfirm?: () => void;
};

const ShelterSearch = ({ onSelect, onSearchConfirm }: Props) => {
  const [query, setQuery] = useState('');
  const [shelters, setShelters] = useState<Shelter[]>([]);
  const [filtered, setFiltered] = useState<Shelter[]>([]);

  useEffect(() => {
    fetch('/api/shelter')
      .then(res => res.json())
      .then((data: Shelter[]) => { // ✅ cast to full type
        setShelters(data);
        setFiltered(data);
      })
      .catch(err => console.error('Failed to load shelters:', err));
  }, []);

  useEffect(() => {
    const result = shelters.filter(s =>
      s.name.toLowerCase().includes(query.toLowerCase())
    );
    setFiltered(result);
  }, [query, shelters]);

  const saveShelter = async (shelter: Shelter) => {
    console.log("saveShelter is called:", shelter.name);
    try {
      const res = await fetch('/api/selection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(shelter),
      });
      const result = await res.json();
      console.log("Shelter saved:", result);
    } catch (error) {
      console.error("Failed to save shelter:", error);
    }
  };

  const handleSelect = async (shelter: Shelter) => {
    console.log("list item is clicked:", shelter.name);
    setQuery(shelter.name);
    onSelect?.(shelter);
  };

  const handleConfirmSearch = async () => {
    console.log("handleConfirmSearch active:");
    const result = shelters.filter(s =>
      s.name.toLowerCase().includes(query.toLowerCase())
    );
    setFiltered(result);

    if (result.length === 1) {
      const shelter = result[0];
      setQuery(shelter.name);
      onSelect?.(shelter);
      await saveShelter(shelter);
      onSearchConfirm?.();
    } else {
      console.log(`${result.length} search results: do not save`);
    }
  };

  const handleSearch = () => {
    console.log("⌨️ handleSearch active (Enter)");
    const result = shelters.filter(s =>
      s.name.toLowerCase().includes(query.toLowerCase())
    );
    setFiltered(result);
  };

  return (
    <div className="p-4">
      <div className="flex items-center bg-purple-100 rounded-full px-4 py-2 w-full max-w-md mx-auto mb-4 shadow-sm">
        <span className="text-xl mr-2">≡</span>
        <input
          type="text"
          placeholder="Enter a shelter..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault(); 
              handleSearch();  
            }
          }}
          className="bg-transparent flex-1 focus:outline-none text-gray-700 placeholder-gray-500"
        />
        <span
          className="text-lg ml-2 cursor-pointer"
          onClick={handleConfirmSearch}
        >
          🔍
        </span>
      </div>

      <ul className="max-w-md mx-auto">
        {Array.from(
          new Map(filtered.map(item => [item._id, item])).values()
        ).map((shelter) => (
          <li
            key={shelter._id}
            onClick={() => handleSelect(shelter)}
            className="p-2 border-b cursor-pointer hover:bg-gray-100 text-black"
          >
            {shelter.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShelterSearch;
