import axios from "axios";

const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_KEY;
const PEXELS_KEY = import.meta.env.VITE_PEXELS_KEY;
const GIPHY_KEY = import.meta.env.VITE_GIPHY_KEY;

export const fetchPhotos = async (query, page = 1, per_page = 20) => {
  const resposnse = await axios.get("https://api.unsplash.com/search/photos", {
    params: { query, page, per_page },
    headers: {
      Authorization: `Client-ID ${UNSPLASH_KEY}`,
    },
  });
  // console.log(resposnse);
  return resposnse.data;
};

// export const fetchVedios = async (query, per_page = 20) => {
//   const resposnse = await axios.get("https://api.pexels.com/videos/search", {
//     params: { query, per_page },
//     headers: {
//       // Authorization: `Client-ID ${PEXELS_KEY}`,
//       Authorization: PEXELS_KEY,
//     },
//   });
//   // console.log(resposnse);
//   return resposnse.data;
// };

export const fetchVedios = async (query, page = 1, per_page = 20) => {
  const response = await axios.get("https://api.pexels.com/videos/search", {
    params: {
      query,
      page,
      per_page,
    },
    headers: {
      Authorization: PEXELS_KEY,
    },
  });

  return response.data;
};

// export const fetchGifs = async (query, limit = 20) => {
//   const res = await axios.get(`https://api.giphy.com/v1/gifs/search`, {
//     params: {
//       api_key: GIPHY_KEY,
//       q: query,
//       limit,
//     },
//   });
//   return res.data;
// };

export const fetchGifs = async (query, page = 1, limit = 20) => {
  const offset = (page - 1) * limit;

  const res = await axios.get("https://api.giphy.com/v1/gifs/search", {
    params: {
      api_key: GIPHY_KEY,
      q: query,
      limit,
      offset,
    },
  });

  return res.data;
};
