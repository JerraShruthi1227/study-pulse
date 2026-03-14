"use client";
import { useEffect, useState } from "react";

export default function Home() {

  const [streak, setStreak] = useState(0);
  const [totalDays, setTotalDays] = useState(0);
  const [lastDate, setLastDate] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  const loadData = async () => {
    const res = await fetch("/api/streak");
    const d = await res.json();
    setStreak(d.streak);
    setTotalDays(d.totalDays);
    setLastDate(d.lastDate);
    setHistory(d.history);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStudy = async () => {

    const today = new Date().toDateString();

    const res = await fetch("/api/streak", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date: today })
    });

    const d = await res.json();
    setMessage(d.message);
    loadData();
  };

  const handleReset = async () => {

    const res = await fetch("/api/streak", {
      method: "DELETE"
    });

    const d = await res.json();
    setMessage(d.message);
    loadData();
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-950 flex items-center justify-center">
      <div className="bg-slate-800 text-white p-10 rounded-3xl shadow-2xl w-[420px]">

        <h1 className="text-3xl font-bold text-center mb-6">
          StudyPulse 📚
        </h1>

        <div className="space-y-4 mb-6">
          <div className="bg-slate-700 p-4 rounded-xl text-center">
            🔥 Current Streak: {streak} days
          </div>

          <div className="bg-slate-700 p-4 rounded-xl text-center">
            📅 Total Study Days: {totalDays}
          </div>

          <div className="bg-slate-700 p-4 rounded-xl text-center">
            ⏱ Last Studied: {lastDate || "No study yet"}
          </div>
        </div>

        {message && (
          <div className="bg-blue-500 text-white p-3 rounded-xl mb-4 text-center">
            {message}
          </div>
        )}

        <div className="flex gap-4 mb-6">
          <button
            onClick={handleStudy}
            className="flex-1 bg-green-500 hover:bg-green-600 p-3 rounded-xl font-semibold"
          >
            I Studied Today
          </button>

          <button
            onClick={handleReset}
            className="flex-1 bg-red-500 hover:bg-red-600 p-3 rounded-xl font-semibold"
          >
            Reset Streak
          </button>
        </div>

        <h2 className="text-center font-semibold mb-3">
          Study History
        </h2>

        <div className="text-center space-y-1 max-h-40 overflow-y-auto">
          {history.length === 0 ? (
            <p className="text-gray-400">No study records yet</p>
          ) : (
            history.map((d, i) => (
              <p key={i}>{i + 1}. {d}</p>
            ))
          )}
        </div>

      </div>
    </main>
  );
}