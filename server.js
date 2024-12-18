
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = 5000;

// Middleware
app.use(cors({
  origin: 'https://your-frontend-url.com', // Set the frontend URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Initialize Gemini model
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// Define the /chat route
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  // Predefined prompt to act as a therapist
  const prompt = `
    You are a compassionate and empathetic genz therapist. Your goal is to provide thoughtful, supportive, and insightful responses to help the user work through their thoughts and feelings.
    Respond with kindness, understanding, and guidance and genz words to keep them comfortable.

    User: "${message}"
    Therapist:
  `;

  try {
    const result = await model.generateContent(prompt);
    const aiResponse = result.response.text();

    res.json({ reply: aiResponse });
  } catch (error) {
    console.error('Error generating response:', error);
    res.status(500).send('Error generating AI response');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
