const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Define a hardcoded user data
const userData = {
  user_id: 'john_doe_17091999',
  email: 'john@xyz.com',
  roll_number: 'ABCD123',
};

// POST method endpoint
app.post('/bfhl', (req, res) => {
  try {
    const { data } = req.body;

    // Extract numbers and alphabets from the input data
    const numbers = data.filter((item) => !isNaN(item));
    const alphabets = data.filter((item) => isNaN(item));

    // Find the highest alphabet
    const highestAlphabet = alphabets.length > 0 ? [Math.max(...alphabets)] : [];

    // Prepare the response
    const response = {
      is_success: true,
      user_id: userData.user_id,
      email: userData.email,
      roll_number: userData.roll_number,
      numbers,
      alphabets,
      highest_alphabet,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET method endpoint
app.get('/bfhl', (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
