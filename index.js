const express = require('express');
const path = require('path');
const events = require('events');

const app = express();
const PORT = process.env.PORT || 8000;

// Increase max event listeners to avoid warnings
events.EventEmitter.defaultMaxListeners = 500;

// Correct project root path
const __path = process.cwd();

// Route: Pair handler (ensure pair.js exports a router)
const code = require('./pair');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Route
app.use('/code', code);

// Pages
app.get('/pair', (req, res) => {
    res.sendFile(path.join(__path, 'pair.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__path, 'main.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`
===================================================
🚀 Server Running Successfully
🌐 URL: http://localhost:${PORT}

⭐ Don't forget to give this project a Star!

Powered by Pamudina Ravihara 🎭
===================================================
    `);
});

module.exports = app;
