"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/navbar/noAccount/header";
import Footer from "../../components/navbar/noAccount/footer";

export default function OrgRegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const role = 'organizer';

  // email format regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // form validity: nonempty username, valid email format, password >= 6 chars
  const isFormValid = username.trim() !== '' && emailRegex.test(email) && password.length >= 6;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!isFormValid) return;

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name: username, email, password, role }),
      });

      if (res.redirected) {
          const url = new URL(res.url);
          router.push(url.pathname);
          return;
        }

        const { error } = await res.json();

        setError(error);
    } catch {
      setError('Network error. Please try again.');
    }
  };

  return (
    <main className="min-h-screen bg-white text-black font-sans flex flex-col">
      <Header>
        <h1 className="text-xl font-bold">ShelterLink</h1>
      </Header>

      <div className="flex flex-col items-center justify-center flex-grow space-y-4 mt-10 text-center">
        <h2 className="text-lg font-semibold text-blue-600">Organization Registration</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded" role="alert">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate
        >
          <input type="hidden" name="role" value={role} />

          <input
            name="name"
            type="text"
            placeholder="User Name"
            className="bg-gray-200 text-center py-2 px-4 w-64 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            className="bg-gray-200 text-center py-2 px-4 w-64 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            pattern="^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$"
            title="Please enter a valid email address"
          />

          <input
            name="password"
            type="password"
            placeholder="Password (min 6 chars)"
            className="bg-gray-200 text-center py-2 px-4 w-64 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />

          <button
            type="submit"
            className={`bg-gray-200 py-2 px-8 rounded ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!isFormValid}
          >
            Sign up
          </button>
        </form>
      </div>

      <Footer />
    </main>
  );
}