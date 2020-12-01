// Personal API Key for OpenWeatherMap API

const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = 'dc60cb5322a634d8c12dbb9bef01ab59';

/* Global Variables */
const generateBtn = document.getElementById('generate');

// Create a new date instance dynamically with JS
const d = new Date();
const newDate = `${d.getMonth()}.${d.getDate()}.${d.getFullYear()}`;

/* Function to GET Web API Data */
const getWeathermap = async (baseUrl, zipcode, apiKey) => {
  const res = await fetch(`${baseUrl + zipcode}&appid=${apiKey}`);

  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log('error', error);
  }
};

/* Function to POST data */
const postWeathermap = async (url = '', data = {}) => {
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await res.json();

    return newData;
  } catch (error) {
    console.log('error', error);
  }
};

/* Function to GET Project Data (Update the UI) */

const updateUi = async (url = '') => {
  const req = await fetch(url);
  try {
    const weatherData = await req.json();
    document.querySelector('#date').innerHTML = `Date: ${weatherData[0].date}`;
    document.querySelector(
      '#temp'
    ).innerHTML = `Temperature: ${weatherData[0].temp}`;
    document.querySelector(
      '#content'
    ).innerHTML = `Feeling: ${weatherData[0].usercomment}`;
  } catch (error) {
    console.log('error', error);
  }
};

/* Function called by event listener */
function callback(e) {
  const zipcode = document.getElementById('zip').value;
  const usercomment = document.getElementById('feelings').value;

  getWeathermap(baseUrl, zipcode, apiKey).then((data) => {
    console.log(data);
    postWeathermap('/postweather', {
      date: newDate,
      temp: data.main.temp,
      usercomment,
    });
    updateUi('/getweather');
  });
}

// Event listener to add function to existing HTML DOM element
generateBtn.addEventListener('click', callback);
