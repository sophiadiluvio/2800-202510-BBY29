'use client';

import React, { useEffect, useState } from 'react';

import type { Shelter } from '../types/shelter.ts'; 


type Props = {
  onSelect?: (shelter: Shelter) => void;
  onSearchConfirm?: () => void;
};

const ShelterSearch = ({ onSelect, onSearchConfirm }: Props) => {
  const [query, setQuery] = useState('');
  const [shelters, setShelters] = useState<Shelter[]>([]);
  const [filtered, setFiltered] = useState<Shelter[]>([]);
  const [isListVisible, setIsListVisible] = useState(false);

  useEffect(() => {
    fetch('/api/shelter')
      .then(res => res.json())
      .then(data => {
        setShelters(data);
        setFiltered(data);
      });
  }, []);

  useEffect(() => {
    const result = shelters.filter(s =>
      s.name.toLowerCase().includes(query.toLowerCase())
    );
    setFiltered(result);
  }, [query, shelters]);

  const handleSelect = async (shelter: Shelter) => {
    setQuery(shelter.name);
    onSelect?.(shelter);
    setIsListVisible(false);
  };

  const handleConfirmSearch = async () => {
    const result = shelters.filter(s =>
      s.name.toLowerCase().includes(query.toLowerCase())
    );
    setFiltered(result);

    if (result.length === 1) {
      const shelter = result[0];
      setQuery(shelter.name);
      onSelect?.(shelter);
      onSearchConfirm?.();
    }
  };

  const handleSearch = () => {
    const result = shelters.filter(s =>
      s.name.toLowerCase().includes(query.toLowerCase())
    );
    setFiltered(result);
  };

  return (
    <div className="p-4">
      <div className="flex items-center bg-purple-100 rounded-full px-4 py-2 w-full max-w-md mx-auto mb-4 shadow-sm" onClick={() => setIsListVisible(true)} > 
        <span className="text-xl mr-2">≡</span>
        <input
          type="text"
          placeholder="Search for a shelter..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleSearch();
          }}}
          className="bg-transparent flex-1 focus:outline-none text-gray-700 placeholder-gray-500"/>
        <span className="text-lg ml-2 cursor-pointer" onClick={(e) => { e.stopPropagation(); handleConfirmSearch(); }}> 🔍 </span>
      </div>

      {isListVisible && ( 
      <ul className="max-w-md mx-auto max-h-35 overflow-y-auto">
        {Array.from( new Map(filtered.map(item => [item._id, item])).values()).map((shelter) => (
          <li
            key={shelter._id}
            onClick={() => handleSelect(shelter)}
            className="p-2 border-b cursor-pointer hover:bg-gray-100 text-black" >
            {shelter.name}
          </li>
        ))}
      </ul>
      )} 
    </div>
  );
};
export default ShelterSearch;
