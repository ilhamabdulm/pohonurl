import API_URL from '../config/api';
import axios from 'axios';
import { getToken } from './storage';

function fetchApi(url, method, param1, param2) {
  return new Promise((res, rej) => {
    axios[method](`${API_URL}/${url}`, param1, param2)
      .then((response) => res(response.data))
      .catch((err) => {
        const defaultError = {
          code: 500,
          status: 'error',
          message: 'Failed to fetch data. Please contact developer.',
        };
        if (!err.response) rej(defaultError);
        else if (!err.response.data) rej(defaultError);
        else rej(err.response.data);
      });
  });
}

const token = getToken();

export const login = async (data) =>
  await fetchApi('users/login', 'post', data);

export const register = async (data) =>
  await fetchApi('users/register', 'post', data);

export const userDetail = async () =>
  await fetchApi('users', 'get', { headers: { token } });

export const updateUser = async (data) =>
  await fetchApi('users', 'put', data, { headers: { token } });

export const addNewLink = async (data) =>
  await fetchApi('links', 'post', data, { headers: { token } });

export const getAllLinks = async () =>
  await fetchApi('links', 'get', { headers: { token } });

export const deleteLink = async (id) =>
  await fetchApi(`links/${id}`, 'delete', { headers: { token } });

export const updateLink = async (id, data) =>
  await fetchApi(`links/${id}`, 'put', data, { headers: { token } });
