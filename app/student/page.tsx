"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

export default function StudentDashboard() {
  const { data: session, status } = useSession();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/student/transactions")
        .then((res) => res.json())
        .then((data) => setTransactions(data));
    }
  }, [status]);

  if (status === "loading") return <p>Loading...</p>;
  if (!session) return <p>You must log in to continue.</p>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-blue-900">
          Welcome, {session.user?.name}
        </h1>

        <button
          onClick={() => signOut()}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <h2 className="text-xl mt-8 mb-4">Your Clinic Transactions</h2>

      <div className="space-y-4">
        {transactions.map((tx: any) => (
          <div
            key={tx._id}
            className="border p-4 bg-white rounded shadow-sm"
          >
            <p className="font-semibold">{tx.type}</p>
            <p className="text-gray-600">{tx.amount} PHP</p>
            <p className="text-sm text-gray-500">
              {new Date(tx.date).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
