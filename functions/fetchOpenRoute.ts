import * as functions from 'firebase-functions';
import axios from 'axios';

interface Context {
  // Add any properties you need from the context object
}

export const fetchOpenRoute = functions.https.onCall(async (context: Context) => {
  const apiKey = process.env.OPENROUTESERVICE_API_KEY;
  console.log('Api key:', apiKey);
  const start_coordinate = '8.681495,49.41461';
  const end_coordinate = '8.686507,49.41943'; // Replace with your desired coordinates
  const profile = 'driving-car'; // Change the profile according to your needs (e.g., 'foot-walking', 'cycling-regular', etc.)

  const url = `https://api.openrouteservice.org/v2/directions/${profile}?api_key=${apiKey}&start=${start_coordinate}&end=${end_coordinate}`;
  console.log('Request URL:', url);

  try {
    console.log('Request URL:', url);
    const response = await axios.get(url);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching route data:', error);
  }
});
