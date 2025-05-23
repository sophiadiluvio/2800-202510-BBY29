//profile page to view and edit user stats and upcoming donations.
'use client';

import { useEffect, useState } from 'react';
import Header from '../../components/navbar/communityMember/header';
import Footer from '../../components/navbar/communityMember/footer';
import LogoutButton from '../../components/logoutButton';
import { editUser, editShelter, updateAcceptedDonations } from '../../actions/editProfile';
import Spinner from '../../components/spinner';
import { CgProfile } from "react-icons/cg";



export default function OrganizationProfilePage() {
  const [userData, setUserData] = useState({ name: '', email: '' });
  const [shelterData, setShelterData] = useState({ name: '', address: '', role: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userEditing, setUserEditing] = useState(false);
  const [shelterEditing, setShelterEditing] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [pendingDonations, setPendingDonations] = useState<any[]>([]);
  const [expandedDonation, setExpandedDonation] = useState<number | null>(null);
  const [shelterNames, setShelterNames] = useState<Record<string, string>>({});


  //Load user profile
  useEffect(() => {
    async function fetchProfile() {
      try {
        setLoading(true);
        const res = await fetch('/api/account');
        if (!res.ok) throw new Error((await res.json()).error || 'Failed to fetch profile');
        const { user } = await res.json();
        setUserData({ name: user?.name || '', email: user?.email || '' });

        //clean the donation data
        if (user?.accepted && typeof user.accepted === 'object') {
          const formatted = Object.entries(user.accepted).map(([shelterId, details]) => {
            const data = details as {
              donation: Record<string, number>;
              opening: string;
              closing: string;
            };

            return {
              shelterId,
              items: data.donation,
              opening: data.opening,
              closing: data.closing
            };
          });

          setPendingDonations(formatted);
          //double check shelter names
          formatted.forEach(donation => {
            if (!shelterNames[donation.shelterId]) {
              fetchShelterName(donation.shelterId);
            }
          });

        } else {
          setPendingDonations([]);
        }


        setError('');
      } catch (err) {
        console.error(err);
        setError('Failed to load profile data. Please try again later.');
      } finally {
        setLoading(false);
      }

    }

    fetchProfile();
  }, [refresh]);

  //fetch the shelter name
  async function fetchShelterName(id: string) {
    try {
      const res = await fetch(`/api/shelter/${id}`);
      if (!res.ok) throw new Error('Shelter not found');
      const data = await res.json();
      setShelterNames(prev => ({ ...prev, [id]: data.name }));
    } catch (err) {
      console.error('Error fetching shelter name:', err);
      setShelterNames(prev => ({ ...prev, [id]: 'Unknown Shelter' }));
    }
  }


  const handleUserSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    try {
      await editUser(form);
      setUserEditing(false);
      setRefresh(r => !r);
      alert('✅ User information saved!');
    } catch (err: any) {
      console.error(err);
      alert(`❌ ${err.message || 'Failed to save user.'}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-black">
        <Spinner color="border-yellow-600" />
      </div>
    );
  }

  const handleCancelDonation = async (shelterId: string) => {
    try {
      const updatedAccepted = pendingDonations
        .filter(d => d.shelterId !== shelterId)
        .reduce((acc, curr) => {
          acc[curr.shelterId] = {
            donation: curr.items,
            opening: curr.opening,
            closing: curr.closing
          };
          return acc;
        }, {} as Record<string, any>);

      await updateAcceptedDonations(updatedAccepted);

      setRefresh(r => !r); // Re-fetch user info
    } catch (err) {
      console.error('Failed to cancel donation', err);
      alert('Could not cancel the donation. Try again later.');
    }
  };


  return (
    <main className="min-h-screen bg-white text-black font-sans flex flex-col">
      <Header>
        <h1 className="text-xl font-bold ml-4">Account Details</h1>
      </Header>

      <div className="flex-1 pb-24">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mx-6 mt-4">
            {error}
          </div>
        )}

        <div className="flex flex-col items-center mt-6">
          <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center">
            <CgProfile className="w-30 h-30 text-black" />
          </div>
        </div>

        {/* User Info */}
        <div className="px-6 mt-8">
          <h2 className="text-lg font-semibold mb-4">User Information</h2>
          <form onSubmit={handleUserSave} className="space-y-4">
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Name</label>
              <input
                name="name"
                type="text"
                className="w-full bg-gray-200 py-2 px-4 rounded"
                value={userData.name}
                disabled={!userEditing}
                onChange={e => setUserData(u => ({ ...u, name: e.target.value }))}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Email</label>
              <input
                name="email"
                type="email"
                className="w-full bg-gray-200 py-2 px-4 rounded"
                value={userData.email}
                disabled={!userEditing}
                onChange={e => setUserData(u => ({ ...u, email: e.target.value }))}
              />
            </div>
            <div className="flex justify-center space-x-4 mt-4">
              {!userEditing ? (
                <button
                  type="button"
                  className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600"
                  onClick={() => setUserEditing(true)}
                >
                  Edit
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    className="bg-gray-300 py-2 px-6 rounded hover:bg-gray-400"
                    onClick={() => setUserEditing(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-500 text-white py-2 px-6 rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                </>
              )}

            </div>
          </form>
        </div>

        <div className="flex justify-center mt-10 mb-6">
          <a
            href="./requested-donations"
            className="bg-yellow-500 text-white py-2 px-6 rounded"
          >
            Donate
          </a>
        </div>
        <div className="px-6 mt-12">
          <h2 className="text-lg font-semibold mb-4">Your Upcoming Donations</h2>
          {pendingDonations.length === 0 ? (
            <p className="text-sm text-gray-600">You have no upcoming donations.</p>
          ) : (
            <div className="bg-gray-100 p-4 rounded-md space-y-4">
              {pendingDonations.map((donation, index) => (
                <div key={index} className="border-b pb-4">
                  <div
                    onClick={() =>
                      setExpandedDonation(prev => (prev === index ? null : index))
                    }
                    className="font-semibold text-base cursor-pointer hover:text-blue-600"
                  >
                    Donation to: {shelterNames[donation.shelterId] || 'Loading...'}
                  </div>

                  {expandedDonation === index && (
                    <div className="ml-2 mt-2 text-sm space-y-1">
                      <p className="text-green-500 font-bold text-base">
                        Supplies Sending:
                      </p>
                      {Object.entries(donation.items).map(([item, qty]) => (
                        <div key={item} className="flex justify-between">
                          <span>{item}</span>
                          <span>{String(qty)}</span>
                        </div>
                      ))}
                      <p><span className="font-semibold">Opens:</span> {donation.opening}</p>
                      <p><span className="font-semibold">Closes:</span> {donation.closing}</p>
                      <button
                        onClick={() => handleCancelDonation(donation.shelterId)}

                        className="mt-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Cancel Donation
                      </button>
                    </div>
                  )}
                </div>
              ))}

            </div>
          )}
        </div>

        {/* Logout button */}
        <div className="flex justify-center mt-10 mb-6">
          <LogoutButton />
        </div>
      </div>

      <Footer />
    </main>
  );
}

