'use client'

import { useEffect, useState } from 'react'
import Header from '../../components/navbar/organization/header';
import Footer from '../../components/navbar/organization/footer';
import { rejectDonation, receivedDonation } from '../../actions/handleDonation';
import Spinner from '../../components/spinner';

interface DonationInfo { [item: string]: number }
interface Donator {
    name: string
    email: string
    donation: DonationInfo
    opening: string   // ISO date string
    closing: string
}

export default function IncomingDonationsPage() {
    const [donators, setDonators] = useState<Donator[]>([])
    const [expanded, setExpanded] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true);

    async function fetchDonors() {
        try {
            setIsLoading(true);
            const res = await fetch('/api/getDonators')
            const data: Donator[] = await res.json()
            // sort by opening date, earliest first
            data.sort((a, b) =>
                new Date(a.opening).getTime() - new Date(b.opening).getTime()
            )
            setDonators(data)
        } catch (err) {
            console.error(err)
        }
        setIsLoading(false);
    }

    useEffect(() => {
        fetchDonors()
    }, [])

    const toggle = (email: string) =>
        setExpanded(prev => (prev === email ? null : email))

    const handleReject = async (email: string) => {
        await rejectDonation(email)
        await fetchDonors()
        if (expanded === email) setExpanded(null)
    }

    const handleReceive = async (email: string) => {
        await receivedDonation(email)
        await fetchDonors()
        if (expanded === email) setExpanded(null)
    }

    return (
        <div className="flex flex-col h-screen bg-white text-black">
            <Header>
                <h1 className="text-xl font-bold">Incoming Donations</h1>
            </Header>

            <main className="flex-grow overflow-auto px-6 py-4 space-y-4 pb-24">

                {isLoading ? <Spinner color="border-blue-600" /> : donators.length === 0 ? (
                    <p className="text-center">No incoming donations at this time.</p>
                ) : (
                    <section className="bg-gray-100 p-4 rounded-md">
                        <h2 className="text-lg font-bold mb-4">All Incoming Donations</h2>
                        {donators.map(d => (
                            <div key={d.email} className="border-b py-2">
                                {/* ← Header row: name + dates */}
                                <div className="flex justify-between items-center">
                                    <div
                                        onClick={() => toggle(d.email)}
                                        className="font-semibold text-base cursor-pointer hover:text-blue-600"
                                    >
                                        {d.name}
                                    </div>
                                    <div className="text-sm flex space-x-6">
                                        <span>
                                            <span className="font-semibold">Opens:</span> {d.opening}
                                        </span>
                                        <span>
                                            <span className="font-semibold">Closes:</span> {d.closing}
                                        </span>
                                    </div>
                                </div>

                                {/* ← Expanded details no longer include opening/closing */}
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

                                        <p><span className="font-semibold">Contact:</span> {d.email}</p>

                                        <button
                                            onClick={() => handleReject(d.email)}
                                            className="mt-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                                        >
                                            Reject Donation
                                        </button>
                                        <button
                                            onClick={() => handleReceive(d.email)}
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
