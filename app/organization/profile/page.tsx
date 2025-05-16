"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/navbar/organization/header";
import Footer from "../../components/navbar/organization/footer";

export default function OrganizationProfilePage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "Shelter C",
    location: "789 Main St",
    email: "shelter@example.com",
    password: "********",
  });

  const [editing, setEditing] = useState(false);

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <main className="min-h-screen bg-white text-black font-sans flex flex-col">
      <Header>
        <h1 className="text-xl font-bold ml-4">Organization Account Details</h1>
      </Header>

      {/* Profile Icon */}
      <div className="flex flex-col items-center mt-6">
        <div className="w-24 h-24 rounded-full bg-gray-800 flex items-center justify-center">
          <span className="text-5xl text-white">👤</span>
        </div>
      </div>

      {/* Account Form */}
      <div className="px-6 mt-6 space-y-3">
        {["name", "location", "email", "password"].map((field) => (
          <input
            key={field}
            type={field === "password" ? "password" : "text"}
            placeholder={`${field[0].toUpperCase() + field.slice(1)}:`}
            className="w-full bg-gray-200 py-2 px-4 rounded"
            value={formData[field as keyof typeof formData]}
            onChange={(e) => handleChange(field as keyof typeof formData, e.target.value)}
            disabled={!editing}
          />
        ))}

        <div className="flex justify-center space-x-4 mt-4">
          <button
            className="bg-gray-300 py-2 px-6 rounded"
            onClick={() => setEditing(true)}
          >
            Edit
          </button>
          <button
            className="bg-gray-300 py-2 px-6 rounded"
            onClick={() => {
              setEditing(false);
              alert("Profile saved!");
            }}
          >
            Save
          </button>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
