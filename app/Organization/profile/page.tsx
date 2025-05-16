"use client";

import { useEffect, useState } from "react";
import Header from "../../components/navbar/organization/header";
import Footer from "../../components/navbar/organization/footer";

export default function OrganizationProfilePage() {
  const [formData, setFormData] = useState({
    name: "Shelter C",
    location: "789 Main St",
    email: "shelter@example.com",
    password: "********",
  });

  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    try {
      setLoading(true);
      const response = await fetch("/api/profile");
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch profile");
      }
      
      const data = await response.json();
      setFormData({
        name: data.name || "",
        location: data.location || "",
        email: data.email || "",
        role: data.role || "",
      });
      setError("");
    } catch (err) {
      console.error("Failed to fetch profile:", err);
      setError("Failed to load profile data. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      setError("");
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save changes");
      }

      setEditing(false);
      alert("Profile saved successfully!");
    } catch (err) {
      console.error("Error saving profile:", err);
      setError("Failed to save profile. Please try again.");
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

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mx-6 mt-4">
          {error}
        </div>
      )}

      <div className="flex flex-col items-center mt-6">
        <div className="w-24 h-24 rounded-full bg-gray-800 flex items-center justify-center">
          <span className="text-5xl text-white">👤</span>
        </div>
        {formData.role && (
          <span className="mt-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            {formData.role}
          </span>
        )}
      </div>

      <div className="px-6 mt-6 space-y-3">
        {["name", "location", "email"].map((field) => (
          <div key={field} className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type={field === "email" ? "email" : "text"}
              placeholder={`Enter ${field}`}
              className="w-full bg-gray-200 py-2 px-4 rounded"
              value={formData[field]}
              onChange={(e) => handleChange(field, e.target.value)}
              disabled={!editing}
            />
          </div>
        ))}

        <div className="flex justify-center space-x-4 mt-8 mb-4">
          {!editing ? (
            <button
              className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600"
              onClick={() => setEditing(true)}
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                className="bg-gray-300 py-2 px-6 rounded hover:bg-gray-400"
                onClick={() => {
                  setEditing(false);
                  fetchProfile(); // Reset form data
                }}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white py-2 px-6 rounded hover:bg-green-600"
                onClick={handleSave}
              >
                Save Changes
              </button>
            </>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}