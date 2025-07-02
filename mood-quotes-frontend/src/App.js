import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [mood, setMood] = useState('');
  const [quotes, setQuotes] = useState([]);
  const [message, setMessage] = useState('');
  const [likedQuotes, setLikedQuotes] = useState(() => {
    const saved = localStorage.getItem('likedQuotes');
    return saved ? JSON.parse(saved) : [];
  });

  const handleSearch = async () => {
    if (!mood.trim()) return;

    try {
      const res = await axios.post('http://localhost:5000/api/quotes/by-mood', {
        mood,
      });

      setQuotes(res.data.quotes);
      setMessage(res.data.message || '');
    } catch (err) {
      setQuotes([]);
      setMessage('❌ Could not fetch quotes.');
      console.error(err);
    }
  };

  const handleLike = (quote) => {
    const alreadyLiked = likedQuotes.some(q => q.text === quote.text);
    let updated;

    if (alreadyLiked) {
      updated = likedQuotes.filter(q => q.text !== quote.text);
    } else {
      updated = [...likedQuotes, quote];
    }

    setLikedQuotes(updated);
    localStorage.setItem('likedQuotes', JSON.stringify(updated));
  };

  return (
    <div className="App">
      <h1>🧠 Mood-Based Quote Generator</h1>

      <input
        type="text"
        placeholder="Enter mood (happy, sad, peace...)"
        value={mood}
        onChange={(e) => setMood(e.target.value)}
      />

      <button onClick={handleSearch}>Search</button>

      {message && <p>{message}</p>}

      <ul>
        {quotes.map((q, index) => (
          <li key={index}>
            <blockquote>"{q.text}"</blockquote>
            <small>- {q.author}</small>
            <br />
            <button onClick={() => handleLike(q)}>
              {likedQuotes.some(lq => lq.text === q.text) ? '❤️ Liked' : '🤍 Like'}
            </button>
          </li>
        ))}
      </ul>

      {likedQuotes.length > 0 && (
        <>
          <h2>❤️ Favorite Quotes</h2>
          <ul>
            {likedQuotes.map((q, index) => (
              <li key={index}>
                <blockquote>"{q.text}"</blockquote>
                <small>- {q.author}</small>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;
