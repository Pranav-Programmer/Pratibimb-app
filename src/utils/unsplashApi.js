// src/utils/unsplashApi.js

const API_KEY = 'BcrvglKRlklcS9VxMJsvPg8QojPSTbltd8Qo0JJSeTA';
const BASE_URL = 'https://api.unsplash.com';

// Function to fetch 10 random photos from the Unsplash API
export const getFeedPhotos = async (count) => {
  try {
    const response = await fetch(
      `${BASE_URL}/photos/random?count=${count}&client_id=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch photos from Unsplash API.');
    }

    const data = await response.json();
    return data.map((photo) => ({
      id: photo.id,
      urls: photo.urls,
      alt_description: photo.alt_description,
      width: photo.width,
      height: photo.height,
      likes: photo.likes,
      location: photo.location,
      // Add more photo info as needed
    }));
  } catch (err) {
    throw new Error(err.message);
  }
};

// Function to fetch user profile data based on the username from the Unsplash API
export const getUserProfile = async (username) => {
  try {
    const response = await fetch(
      `${BASE_URL}/users/justzht?client_id=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch user profile from Unsplash API.');
    }

    const data = await response.json();
    return {
      username: data.username,
      name: data.name,
      bio: data.bio,
      profileImage: data.profile_image,
      photos: data.photos,
      // Add more user profile info as needed
    };
  } catch (err) {
    throw new Error(err.message);
  }
};
