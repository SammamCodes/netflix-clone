import axios from 'axios';
import { ENV_VARS } from '../config/envVars.js';

export const fetchFromTMDB = async (url) => {
  if (!url) {
    throw new Error("URL is required to fetch data from TMDB.");
  }

  const options = {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${ENV_VARS.TMDB_API_KEY}`,
    },
  };

  try {
    const response = await axios.get(url, options);

    if (response.status !== 200) {
      throw new Error(
        `Failed to fetch data from TMDB. Status: ${response.status} ${response.statusText || ''}`
      );
    }

    return response.data; // Return the fetched data
  } catch (error) {
    throw new Error(`Error fetching data from TMDB: ${error.message}`);
  }
};
