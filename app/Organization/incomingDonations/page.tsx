'use client'

import { useEffect, useState } from 'react'
import Header from '../../components/navbar/organization/header';
import Footer from '../../components/navbar/organization/footer';
import { rejectDonation, receivedDonation } from '../../actions/handleDonation';

interface DonationInfo { [item: string]: number }
interface Donator {
    name: string
    email: string
    donation: DonationInfo
    opening: string
    closing: string
}

export default function IncomingDonationsPage() {
    const [donators, setDonators] = useState<Donator[]>([])
    const [expanded, setExpanded] = useState<string | null>(null)

    // extract fetch logic so we can reuse it
    async function fetchDonors() {
        try {
            const res = await fetch('/api/getDonators')
            const data = await res.json()
            setDonators(data)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchDonors()
    }, [])

    const toggle = (name: string) =>
        setExpanded(prev => (prev === name ? null : name))

    // call the server action + re-fetch
    const handleReject = async (email: string) => {
        await rejectDonation(email)
        await fetchDonors()
        if (expanded === email) setExpanded(null)
    }

    return (
        <div className="flex flex-col h-screen bg-white text-black">
            <Header>
                <h1 className="text-xl font-bold">Incoming Donations</h1>
            </Header>

            <main className="flex-grow overflow-auto px-6 py-4 space-y-4 pb-24">
                {donators.length === 0 ? (
                    <p className="text-center">No incoming donations at this time.</p>
                ) : (
                    <section className="bg-gray-100 p-4 rounded-md">
                        <h2 className="text-lg font-bold mb-4">All Incoming Donations</h2>
                        {donators.map(d => (
                            <div key={d.email} className="border-b py-2">
                                <div
                                    onClick={() => toggle(d.email)}
                                    className="font-semibold text-base cursor-pointer hover:text-blue-600"
                                >
                                    {d.name}
                                </div>

                                {expanded === d.email && (
                                    <div className="mt-2 ml-4 text-sm space-y-2">
                                        <p className="text-green-500 font-bold" style={{ fontSize: '17px' }}>
                                            Supplies Incoming:
                                        </p>
                                        {Object.entries(d.donation).map(([item, qty]) => (
                                            <div key={item} className="flex justify-between">
                                                <span>{item}</span>
                                                <span>{qty}</span>
                                            </div>
                                        ))}

                                        <p><span className="font-semibold">Opens:</span>  {d.opening}</p>
                                        <p><span className="font-semibold">Closes:</span> {d.closing}</p>
                                        <p><span className="font-semibold">Contact:</span> {d.email}</p>

                                        {/* ← REJECT button */}
                                        <button
                                            onClick={() => handleReject(d.email)}
                                            className="mt-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                                        >
                                            Reject Donation
                                        </button>
                                        {/* ← RECEIVE button */}
                                        <button
                                            onClick={async () => {
                                                await receivedDonation(d.email)
                                                await fetchDonors()
                                                if (expanded === d.email) setExpanded(null)
                                            }}
                                            className="ml-2 mt-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                                        >
                                            Received Donation
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </section>
                )}
            </main>

            <Footer />
        </div>
    )
}
