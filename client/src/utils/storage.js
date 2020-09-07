const ACCESS_TOKEN = 'pohon_accessToken';

export const setToken = (value) => localStorage.setItem(ACCESS_TOKEN, value);

export const getToken = () => localStorage.getItem(ACCESS_TOKEN) || '';

export const clearStorage = () => localStorage.clear();
