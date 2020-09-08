const API_URL =
  process.env.NODE_ENV === 'development'
    ? 'https://dry-shore-35382.herokuapp.com/v1'
    : 'https://dry-shore-35382.herokuapp.com/v1';

export default API_URL;
