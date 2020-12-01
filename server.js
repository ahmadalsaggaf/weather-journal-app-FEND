// Setup empty JS object to act as endpoint for all routes
const projectData = [];

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();
/* Middleware */
// Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');

app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 9000;
app.listen(port, () => {
  console.log(`Hi I am port ${port} and I am working`);
});

// Initialize all route with a callback function

// Callback function to complete GET '/all'
app.get('/getweather', (req, res) => res.send(projectData));

// A route for error links
app.get('*', (req, res) => res.send('Page not found'));

// Post Route
app.post('/postweather', (req, res) => {
  const newData = {
    temp: req.body.temp,
    date: req.body.date,
    usercomment: req.body.usercomment,
  };
  projectData.push(newData);
});
