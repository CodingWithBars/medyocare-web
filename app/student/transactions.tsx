// pages/transactions.tsx
"use client";
import { useEffect, useState } from "react";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTransactions() {
      const res = await fetch("/api/transactions");
      const data = await res.json();
      setTransactions(data);
      setLoading(false);
    }
    fetchTransactions();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Clinic Transactions</h1>
      {transactions.length === 0 && <p>No transactions found.</p>}
      <ul className="space-y-2">
        {transactions.map((t) => (
          <li key={t._id} className="border p-4 rounded shadow-sm flex justify-between">
            <span>{new Date(t.date).toLocaleDateString()}</span>
            <span>{t.description}</span>
            <span>${t.amount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
