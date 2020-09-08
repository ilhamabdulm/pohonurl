const API_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://192.168.1.114:4000/v1'
    : 'https://dry-shore-35382.herokuapp.com/v1';

export default API_URL;
