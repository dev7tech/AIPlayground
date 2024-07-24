import axios from 'axios';
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

const verifyApiKey = async (apiKey) => {
  return await axios
    .post(`${serverUrl}/verifyApiKey`, apiKey, {
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error('There was an error while connecting with server.');
      return null;
    });
};

const wearGlasses = (formData) => {
  return axios
    .post(`${serverUrl}/glasses`, formData, {
      responseType: 'arraybuffer',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      const blob = new Blob([response.data], { type: 'image/png' });
      const imageUrl = URL.createObjectURL(blob);
      return imageUrl;
    })
    .catch((error) => {
      console.error('There was an error uploading the file!', error);
      return null;
    });
};

const chatWithAI = async (message) => {
  return axios
    .post(`${serverUrl}/chat`, message, {
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error('There was an error while chatting with AI', error);
      return null;
    });
};

export const api = {
  wearGlasses,
  chatWithAI,
  verifyApiKey,
};
