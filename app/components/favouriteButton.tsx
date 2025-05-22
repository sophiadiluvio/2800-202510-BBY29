'use client';

import { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { addFavourite, removeFavourite } from '../actions/favourites';

interface Props {
  shelterId: string;
}

export default function FavouriteButton({ shelterId }: Props) {
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    async function fetchFavouriteStatus() {
      const res = await fetch('/api/account');
      if (!res.ok) return;
      const data = await res.json();
      const favIds = data.user.favourites.map((id: any) => id.toString());
      setIsFavorited(favIds.includes(shelterId));
    }

    fetchFavouriteStatus();
  }, [shelterId]);

  async function toggleFavourite() {
    const formData = new FormData();
    formData.append('shelterId', shelterId);

    const action = isFavorited ? removeFavourite : addFavourite;
    const res = await action(formData);
    if (res && res.success) {
      setIsFavorited(!isFavorited);
    }
  }

  return (
    <button onClick={toggleFavourite} aria-label="Toggle Favorite">
      {isFavorited ? (
        <FaHeart className="text-red-500 text-lg" />
      ) : (
        <FaRegHeart className="text-gray-500 text-lg" />
      )}
    </button>
  );
}
