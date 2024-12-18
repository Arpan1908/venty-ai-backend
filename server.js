// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();
// const port = 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Query function to call Hugging Face API
// async function query(data) {
//   const response = await fetch(
//     'https://api-inference.huggingface.co/models/google/flan-t5-base',
//     {
//       headers: {
//         Authorization: `Bearer ${process.env.HF_API_KEY}`,
//         'Content-Type': 'application/json',
//       },
//       method: 'POST',
//       body: JSON.stringify(data),
//     }
//   );

//   const result = await response.json();
//   AIzaSyD7oqBFDTx3nW1_hF5CAx5iXBdnZBkklGI
//   return result;
// }

// // Define the /chat route
// app.post('/api/chat', async (req, res) => {
//   const { message } = req.body;

//   try {
//     const data = { inputs: message };
//     const result = await query(data);

//     const aiResponse = result[0]?.generated_text || 'Sorry, I could not generate a response.';
//     res.json({ reply: aiResponse });
//   } catch (error) {
//     console.error('Error generating response:', error);
//     res.status(500).send('Error generating AI response');
//   }
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });



// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();
// const { GoogleGenerativeAI } = require('@google/generative-ai');

// const app = express();
// const port = 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Initialize Gemini model
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// // Define the /chat route
// app.post('/api/chat', async (req, res) => {
//   const { message } = req.body;

//   try {
//     const result = await model.generateContent(message);
//     const aiResponse = result.response.text();

//     res.json({ reply: aiResponse });
//   } catch (error) {
//     console.error('Error generating response:', error);
//     res.status(500).send('Error generating AI response');
//   }
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });


const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
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
