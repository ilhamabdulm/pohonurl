const API_URL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:4000/v1' : '';

export default API_URL;
