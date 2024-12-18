const express = require('express');
const { HfInference } = require('@huggingface/inference');
const router = express.Router();

// Initialize Hugging Face Inference with the API key from the environment variable
const hf = new HfInference({ token: process.env.HF_API_KEY });

// Define the /chat route
router.post('/chat', async (req, res) => {
  const { message } = req.body; // Extract the message from the request body

  const prompt = `You are a helpful assistant. You are Qwen developed by Alibaba. You should think step-by-step.\nUser: ${message}\nAI:`;

  try {
    // Call the Hugging Face API to get the response
    const result = await hf.generate({
      model: 'Qwen/QwQ-32B-Preview',
      inputs: prompt,
      parameters: {
        max_new_tokens: 150, // Limit the length of the generated response
        temperature: 0.7, // Controls randomness of the response
      },
    });

    // Get the AI's response
    const aiResponse = result.generated_text;

    // Send the AI's response back to the client
    res.json({ reply: aiResponse });
  } catch (error) {
    console.error('Error generating response:', error);
    res.status(500).send('Error generating AI response');
  }
});

module.exports = router;
