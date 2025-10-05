'use client';

import React, { useState } from "react";

export default function JokePage() {
  const [joke, setJoke] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchJoke = async () => {
    setLoading(true);
    setError(null);
    setJoke(null);
    try {
      const res = await fetch("https://official-joke-api.appspot.com/jokes/random");
      if (!res.ok) throw new Error("Failed to fetch joke");
      const data = await res.json();
      setJoke(`${data.setup} — ${data.punchline}`);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{padding: 32}}>
      <h1>Random Joke</h1>
      <button onClick={fetchJoke} disabled={loading}>
        {loading ? "Loading..." : "Get a Joke"}
      </button>
      {joke && <p style={{marginTop: 16}}>{joke}</p>}
      {error && <p style={{marginTop: 16, color: "red"}}>Error: {error}</p>}
    </div>
  );
}
