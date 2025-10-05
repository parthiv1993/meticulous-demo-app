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
    <div style={{
      padding: 32, 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white'
    }}>
      {/* Decorative graphics */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: 32
      }}>
        <div style={{
          width: 100,
          height: 100,
          background: 'linear-gradient(45deg, #ff6b6b, #feca57)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 40,
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
        }}>
          😂
        </div>
      </div>

      <h1 style={{
        textAlign: 'center',
        fontSize: 48,
        marginBottom: 32,
        textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
      }}>
        Random Joke Generator
      </h1>

      <div style={{textAlign: 'center'}}>
        <button 
          onClick={fetchJoke} 
          disabled={loading}
          style={{
            padding: '16px 32px',
            fontSize: 18,
            background: loading ? '#95a5a6' : 'linear-gradient(45deg, #e74c3c, #f39c12)',
            color: 'white',
            border: 'none',
            borderRadius: 50,
            cursor: loading ? 'not-allowed' : 'pointer',
            boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
            transform: loading ? 'scale(0.95)' : 'scale(1)',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            if (!loading) {
              const target = e.target as HTMLButtonElement;
              if (target && target.style) target.style.transform = 'scale(1.05)';
            }
          }}
          onMouseOut={(e) => {
            if (!loading) {
              const target = e.target as HTMLButtonElement;
              if (target && target.style) target.style.transform = 'scale(1)';
            }
          }}
        >
          {loading ? "🔄 Loading..." : "🎯 Get a Joke"}
        </button>
      </div>

      {/* Animated visual feedback */}
      {joke && (
        <div style={{
          marginTop: 32,
          padding: 24,
          background: 'rgba(255,255,255,0.1)',
          borderRadius: 16,
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
        }}>
          <p style={{
            fontSize: 20, 
            lineHeight: 1.6, 
            textAlign: 'center',
            margin: 0
          }}>
            {joke}
          </p>
        </div>
      )}

      {error && (
        <div style={{
          marginTop: 32,
          padding: 20,
          background: 'linear-gradient(45deg, #e74c3c, #c0392b)',
          borderRadius: 12,
          textAlign: 'center',
          boxShadow: '0 4px 16px rgba(231, 76, 60, 0.3)'
        }}>
          <p style={{margin: 0, fontSize: 18}}>❌ Error: {error}</p>
        </div>
      )}

      {/* Decorative floating elements */}
      <div style={{
        position: 'absolute',
        top: 100,
        left: 50,
        width: 20,
        height: 20,
        background: '#ff6b6b',
        borderRadius: '50%',
        opacity: 0.6
      }} />
      <div style={{
        position: 'absolute',
        top: 200,
        right: 80,
        width: 30,
        height: 30,
        background: '#feca57',
        borderRadius: '50%',
        opacity: 0.4
      }} />
      <div style={{
        position: 'absolute',
        bottom: 150,
        left: 100,
        width: 25,
        height: 25,
        background: '#48dbfb',
        borderRadius: '50%',
        opacity: 0.5
      }} />
    </div>
  );
}
