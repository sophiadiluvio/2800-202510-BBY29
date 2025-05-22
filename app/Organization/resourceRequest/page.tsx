// app/(whatever)/resourceRequest/page.tsx
"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import Header from "../../components/navbar/organization/header";
import Footer from "../../components/navbar/organization/footer";

// define the 8 resources and their “API names”
const RESOURCE_ITEMS = [
  { key: "perishableFood",        label: "Perishable food" },
  { key: "nonPerishableFood",     label: "Non-perishable food" },
  { key: "hygieneProducts",       label: "Hygiene products" },
  { key: "clothingFootwear",      label: "Clothing & footwear" },
  { key: "beddingLinens",         label: "Bedding & linens" },
  { key: "firstAidMedical",       label: "First aid & medical supplies" },
  { key: "cleaningHousehold",     label: "Cleaning & household supplies" },
  { key: "seasonalGear",          label: "Seasonal gear" },
] as const;

type ResourceKey = typeof RESOURCE_ITEMS[number]["key"];

export default function ResourceRequestPage() {
  const router = useRouter();

  // initialize all counts to zero (or whatever you like)
  const [resources, setResources] = useState<Record<ResourceKey, number>>(
    () =>
      RESOURCE_ITEMS.reduce(
        (acc, { key }) => ({ ...acc, [key]: 0 }),
        {} as Record<ResourceKey, number>
      )
  );

  const increment = (key: ResourceKey) =>
    setResources((prev) => ({ ...prev, [key]: prev[key] + 1 }));

  const decrement = (key: ResourceKey) =>
    setResources((prev) => ({ ...prev, [key]: Math.max(0, prev[key] - 1) }));

  // on form submit, map state → API payload and POST
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    // build { "Perishable food": 2, ... } object
    const payload = RESOURCE_ITEMS.reduce((acc, { key, label }) => {
      acc[label] = resources[key];
      return acc;
    }, {} as Record<string, number>);

    try {
      const res = await fetch("/api/resourceRequest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error?.error || "Unknown error");
      }

      const json = await res.json();
      alert(json.message);
      // optionally refresh data or navigate away:
      router.refresh();
    } catch (err: any) {
      console.error("Submit failed:", err);
      alert("Failed to submit: " + err.message);
    }
  }

  return (
    <main className="min-h-screen bg-white text-black font-sans flex flex-col">
      <Header>
        <h1 className="text-xl font-bold ml-4">Resource Request</h1>
      </Header>

      <form onSubmit={handleSubmit} className="p-6 space-y-4 flex-grow">
        <div className="bg-gray-200 p-4 rounded space-y-4">
          {RESOURCE_ITEMS.map(({ key, label }) => (
            <div
              key={key}
              className="flex justify-between items-center"
            >
              <span>{label}</span>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => decrement(key)}
                  className="px-2"
                >
                  −
                </button>
                <span className="w-8 text-center">
                  {resources[key]}
                </span>
                <button
                  type="button"
                  onClick={() => increment(key)}
                  className="px-2"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 w-full rounded font-semibold"
        >
          Confirm Request
        </button>
      </form>

      <Footer />
    </main>
  );
}

