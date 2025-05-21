'use client';
import { addFavourite, removeFavourite } from '../../actions/favourites';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Header from '../../components/navbar/noAccount/header';
import Footer from '../../components/navbar/noAccount/footer';
import InventoryGrid from '../../components/inventoryGrid';
import Spinner from '../../components/spinner';
import { useRouter } from 'next/navigation';
import { ParamValue } from 'next/dist/server/request/params';

export default function ShelterPage() {
  const router = useRouter();
  const [isFavorited, setIsFavorited] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [shelter, setShelter] = useState<any>(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`/api/shelter/${id}`)
      .then((res) => res.json())
      .then((data) => setShelter(data));
  }, []);

  useEffect(() => {
    async function checkFavouriteStatus() {
      try {
        const res = await fetch('/api/account');
        if (!res.ok) return;

        const data = await res.json();
        const user = data.user;
        setUserId(user._id);

        const isFav = user.favourites?.some((favId: ParamValue) => favId === id || favId?.toString() === id);
        setIsFavorited(isFav);

      } catch (err) {
        console.error('Error checking favourites:', err);
      }
    }

    checkFavouriteStatus();
  }, []);


  if (shelter == null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-black">
        <Spinner color="border-green-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <Header />
      <main className="flex-1 p-4">
        <div className="mb-6">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold">{shelter.name}</h1>
            {userId && (
              <form
                action={isFavorited ? removeFavourite : addFavourite}
                onSubmit={() => {
                  setIsFavorited(!isFavorited); // optimistic UI update
                  setTimeout(() => router.refresh(), 100);
                }}

              >
                <input type="hidden" name="shelterId" value={id} />
                <button type="submit" aria-label="Toggle Favorite">
                  {isFavorited ? (
                    <FaHeart className="text-red-500 text-xl" />
                  ) : (
                    <FaRegHeart className="text-gray-500 text-xl" />
                  )}
                </button>
              </form>
            )}
          </div>

          <p className="text-gray-700">{shelter.address}</p>
          <p className='text-gray-700'>{shelter.email}</p>
        </div>

        <InventoryGrid shelter={shelter} />
      </main>

      <Footer />
    </div>
  );
}
