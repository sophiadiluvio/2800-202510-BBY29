'use client';

import { useState } from 'react';
// import ItemDeleteButton from './ItemDeleteButton';


interface prop {
    addedItem: () => void;
}

export default function itemForm({ addedItem } : prop) {
  const [showForm, setShowForm] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const toggleForm = () => {
    setShowForm(prev => !prev);
  };


}

