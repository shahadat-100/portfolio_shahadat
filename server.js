require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '/')));

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// Note: user requested gemini-3-flash, but currently it's usually gemini-1.5-flash.
// I will use what they asked, but it might error out if it doesn't exist.
const model = genAI.getGenerativeModel({ model: 'gemini-3-flash' });

app.post('/api/chat', async (req, res) => {
  try {
    const { history, message } = req.body;
    
    // We expect history to be formatted correctly for the SDK
    const chat = model.startChat({
      history: history || [],
      generationConfig: {
        maxOutputTokens: 256,
        temperature: 0.7,
        topP: 0.9,
      },
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    res.json({ text });
  } catch (error) {
    console.error('Error generating chat response:', error);
    
    // Fallback logic if gemini-3-flash fails
    if (error.message && error.message.includes('models/gemini-3-flash is not found')) {
      console.log('Falling back to gemini-1.5-flash');
      try {
        const fallbackModel = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const chat = fallbackModel.startChat({
          history: req.body.history || [],
          generationConfig: {
            maxOutputTokens: 256,
            temperature: 0.7,
            topP: 0.9,
          },
        });
        const result = await chat.sendMessage(req.body.message);
        const response = await result.response;
        const text = response.text();
        return res.json({ text });
      } catch (fallbackError) {
         console.error('Fallback error:', fallbackError);
         return res.status(500).json({ error: 'Failed to generate response' });
      }
    }

    res.status(500).json({ error: 'Failed to generate response' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
