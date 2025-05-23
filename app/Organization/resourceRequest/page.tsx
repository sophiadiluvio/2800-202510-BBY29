// app/(whatever)/resourceRequest/page.tsx
"use client";

import { FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Spinner from '../../components/spinner';
import Header from "../../components/navbar/organization/header";
import Footer from "../../components/navbar/organization/footer";

// ─── CONFIG ────────────────────────────────────────────────────────────────
const RESOURCE_ITEMS = [
  { key: "perishableFood",    label: "Perishable food" },
  { key: "nonPerishableFood", label: "Non‑perishable food" },
  { key: "hygieneProducts",   label: "Hygiene products" },
  { key: "clothingFootwear",  label: "Clothing & footwear" },
  { key: "beddingLinens",     label: "Bedding & linens" },
  { key: "firstAidMedical",   label: "First aid & medical supplies" },
  { key: "cleaningHousehold", label: "Cleaning & household supplies" },
  { key: "seasonalGear",      label: "Seasonal gear" },
] as const;

type ResourceKey = typeof RESOURCE_ITEMS[number]["key"];

// helper to build a zero‑filled record of every key
const zeroedResources = (): Record<ResourceKey, number> =>
  RESOURCE_ITEMS.reduce((acc, { key }) => {
    acc[key] = 0;
    return acc;
  }, {} as Record<ResourceKey, number>);

// ─── COMPONENT ───────────────────────────────────────────────────────────────
export default function ResourceRequestPage() {
  const router = useRouter();

  // state: your counters
  const [resources, setResources] = useState<Record<ResourceKey, number>>(
    zeroedResources()
  );
  // loading state so we don't flash zeros before data arrives
  const [loading, setLoading] = useState(true);

  // fetch the shelter’s `req` once, then seed `resources` from it
  useEffect(() => {
    async function loadNeeds() {
      try {
        const res = await fetch("/api/userShelter");
        const { userShelter } = await res.json();
        const needs: Record<string, number> = userShelter?.req || {};

        // map each label → its requested count
        const initial = RESOURCE_ITEMS.reduce(
          (acc, { key, label }) => {
            acc[key] = needs[label] ?? 0;
            return acc;
          },
          {} as Record<ResourceKey, number>
        );

        setResources(initial);
      } catch (err) {
        console.error("Failed to load shelter needs", err);
      } finally {
        setLoading(false);
      }
    }
    loadNeeds();
  }, []);

  // adjust one counter up or down
  const increment = (key: ResourceKey) =>
    setResources((prev) => ({ ...prev, [key]: prev[key] + 1 }));
  const decrement = (key: ResourceKey) =>
    setResources((prev) => ({ ...prev, [key]: Math.max(0, prev[key] - 1) }));

  // send the updated counts back to your API
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
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
        const err = await res.json();
        throw new Error(err.error || "Unknown error");
      }
      alert((await res.json()).message);
      router.refresh();
    } catch (err: any) {
      console.error("Submit failed:", err);
      alert("Failed to submit: " + err.message);
    }
  }

  // ─── RENDER ────────────────────────────────────────────────────────────────
  if (loading) {
    return (
       <div className="min-h-screen flex items-center justify-center bg-white text-black">
                    <Spinner color="border-blue-600" />
                  </div>
    );
  }

  return (
    <main className="min-h-screen bg-white text-black flex flex-col">
      <Header>
        <h1 className="text-xl font-bold ml-4">Resource Request</h1>
      </Header>

      <form onSubmit={handleSubmit} className="p-6 space-y-4 flex-grow">
        <div className="bg-gray-100 p-4 rounded-lg space-y-3">
          {RESOURCE_ITEMS.map(({ key, label }) => (
            <div
              key={key}
              className="flex justify-between items-center py-2"
            >
              {/* resource name */}
              <span className="font-medium">{label}</span>

              {/* counter */}
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => decrement(key)}
                  className="px-3 py-1 bg-gray-200 rounded"
                >
                  −
                </button>
                <span className="w-8 text-center">{resources[key]}</span>
                <button
                  type="button"
                  onClick={() => increment(key)}
                  className="px-3 py-1 bg-gray-200 rounded"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded w-full font-semibold"
        >
          Confirm Request
        </button>
      </form>

      <Footer />
    </main>
  );
}
