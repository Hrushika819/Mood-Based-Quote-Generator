const express = require('express');
const router = express.Router();
const Quote = require('../models/Quote');

// 📌 Seed sample quotes
router.get('/seed', async (req, res) => {
  try {
    await Quote.deleteMany();

    await Quote.insertMany([
      { text: "Keep your face toward the sunshine.", author: "Walt Whitman", mood: "happy" },
      { text: "For every minute you are angry you lose sixty seconds of happiness.", author: "Ralph Waldo Emerson", mood: "happy" },
      { text: "Happiness depends upon ourselves.", author: "Aristotle", mood: "happy" },
      { text: "Believe in yourself and all that you are.", author: "Larson", mood: "self-confidence" },
      { text: "No one can make you feel inferior without your consent.", author: "Eleanor Roosevelt", mood: "self-confidence" },
      { text: "It’s okay to not be okay.", author: "Unknown", mood: "sad" },
      { text: "Tears come from the heart and not from the brain.", author: "Leonardo da Vinci", mood: "sad" },
      { text: "Sadness flies away on the wings of time.", author: "Jean de La Fontaine", mood: "sad" },
      { text: "Anger is a short madness.", author: "Horace", mood: "anger" },
      { text: "Speak when you are angry and you will make the best speech you will ever regret.", author: "Ambrose Bierce", mood: "anger" },
      { text: "Peace begins with a smile.", author: "Mother Teresa", mood: "peace" },
      { text: "Nothing can bring you peace but yourself.", author: "Ralph Waldo Emerson", mood: "peace" },
      { text: "Do not let the behavior of others destroy your inner peace.", author: "Dalai Lama", mood: "peace" },
      { text: "A day without laughter is a day wasted.", author: "Charlie Chaplin", mood: "funny" },
      { text: "A day without laughter is a day wasted.", author: "Charlie Chaplin", mood: "funny" },
      { text: "Behind every great man is a woman rolling her eyes.", author: "Jim Carrey", mood: "funny" },
      { text: "Push yourself, because no one else is going to do it for you.", author: "Unknown", mood: "motivational" },
      { text: "It always seems impossible until it’s done.", author: "Nelson Mandela", mood: "motivational" },
      { text: "When you go through the worst the only thing that comes to you is the best for you.", author: "unknown", mood: "motivational" },
      { text: "Don’t watch the clock; do what it does. Keep going.", author: "Sam Levenson", mood: "motivational" }
    ]);

    res.send('✅ Quotes seeded successfully');
  } catch (err) {
    res.status(500).json({ error: '❌ Seeding failed' });
  }
});

// 🔍 Add this block below the /seed route 👇
router.post('/by-mood', async (req, res) => {
  const { mood } = req.body;

  try {
    const quotes = await Quote.find({
      mood: { $regex: new RegExp(mood, "i") } // case-insensitive match
    });

    if (quotes.length === 0) {
      return res.json({ mood, quotes: [], message: "No quotes found for that mood." });
    }

    res.json({ mood, quotes });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch quotes" });
  }
});

module.exports = router;
