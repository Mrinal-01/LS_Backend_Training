const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse URL-encoded data
app.use(bodyParser.urlencoded({ extended: false }));

// Set the view engine to EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Route to display the form
app.get('/', (req, res) => {
  res.render('form');
});

// Route to handle form submission
app.post('/submit', (req, res) => {
  const username = req.body.username;
  const age = req.body.age;
  res.render('result', { username: username, age: age });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
