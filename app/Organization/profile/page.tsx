'use client';

import { useEffect, useState } from 'react';
import Header from '../../components/navbar/organization/header';
import Footer from '../../components/navbar/organization/footer';
import LogoutButton from '../../components/logoutButton';
import { editUser, editShelter } from '../../actions/editProfile';
import { CgProfile } from "react-icons/cg";


export default function OrganizationProfilePage() {
  const [userData, setUserData] = useState({ name: '', email: '' });
  const [shelterData, setShelterData] = useState({ name: '', address: '', role: '', website: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userEditing, setUserEditing] = useState(false);
  const [shelterEditing, setShelterEditing] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      try {
        setLoading(true);
        const res = await fetch('/api/account');
        if (!res.ok) throw new Error((await res.json()).error || 'Failed to fetch profile');
        const { user } = await res.json();
        setUserData({ name: user?.name || '', email: user?.email || '' });
        setError('');
      } catch (err) {
        console.error(err);
        setError('Failed to load profile data. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    async function fetchUserShelter() {
      try {
        setLoading(true);
        const res = await fetch('/api/userShelter');
        if (!res.ok) throw new Error((await res.json()).error || 'Failed to fetch shelter');
        const { userShelter } = await res.json();
        setShelterData({
          name: userShelter?.name || '',
          address: userShelter?.address || '',
          role: userShelter?.role || '',
          website: userShelter?.website || ''
        });
        setError('');
      } catch (err) {
        console.error(err);
        setError('Failed to load shelter data. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
    fetchUserShelter();
  }, [refresh]);

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

  const handleShelterSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    try {
      await editShelter(form);
      setShelterEditing(false);
      setRefresh(r => !r);
      alert('✅ Shelter information saved!');
    } catch (err: any) {
      console.error(err);
      alert(`❌ ${err.message || 'Failed to save shelter.'}`);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-white text-black font-sans flex flex-col items-center justify-center">
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-black font-sans flex flex-col">
      <Header>
        <h1 className="text-xl font-bold ml-4">Organization Account Details</h1>
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
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Website</label>
              <input
                name="website"
                type="url"
                placeholder="Shelter Website / Volunteer postings (optional)"
                className="w-full bg-gray-200 py-2 px-4 rounded"
                value={shelterData.website}
                disabled={!shelterEditing}
                onChange={e => setShelterData(s => ({ ...s, website: e.target.value }))}
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

        {/* Shelter Info */}
        <div className="px-6 mt-8">
          <h2 className="text-lg font-semibold mb-4">Shelter Information</h2>
          <form onSubmit={handleShelterSave} className="space-y-4">
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Name</label>
              <input
                name="name"
                type="text"
                className="w-full bg-gray-200 py-2 px-4 rounded"
                value={shelterData.name}
                disabled={!shelterEditing}
                onChange={e => setShelterData(s => ({ ...s, name: e.target.value }))}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Address</label>
              <input
                name="address"
                type="text"
                className="w-full bg-gray-200 py-2 px-4 rounded"
                value={shelterData.address}
                disabled={!shelterEditing}
                onChange={e => setShelterData(s => ({ ...s, address: e.target.value }))}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Role</label>
              <input
                name="role"
                type="text"
                className="w-full bg-gray-200 py-2 px-4 rounded"
                value={shelterData.role}
                disabled={!shelterEditing}
                onChange={e => setShelterData(s => ({ ...s, role: e.target.value }))}
              />
            </div>
            <div className="flex justify-center space-x-4 mt-4">
              {!shelterEditing ? (
                <button
                  type="button"
                  className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600"
                  onClick={() => setShelterEditing(true)}
                >
                  Edit
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    className="bg-gray-300 py-2 px-6 rounded hover:bg-gray-400"
                    onClick={() => setShelterEditing(false)}
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

        {/* Logout button */}
        <div className="flex justify-center mt-10 mb-6">
          <LogoutButton />
        </div>
      </div>

      <Footer />
    </main>
  );
}
