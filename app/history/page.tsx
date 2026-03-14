"use client";
import { useEffect, useState } from "react";

export default function History() {
  const [dates, setDates] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("studyHistory");
    if (saved) {
      setDates(JSON.parse(saved));
    }
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-10">
      <h1 className="text-3xl text-white font-bold mb-6">📅 Study History</h1>

      <div className="bg-white rounded-2xl p-6 shadow-xl">
        {dates.length === 0 ? (
          <p>No study records yet</p>
        ) : (
          <ul className="space-y-3">
            {dates.map((d, i) => (
              <li key={i} className="p-3 bg-gray-100 rounded-xl">
                {d}
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}