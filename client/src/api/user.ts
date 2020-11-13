import axios, { AxiosResponse } from 'axios';
import { RegisterResponse } from '../interfaces/user';
import { API_URL } from './config';

export const register = async (
  name: string,
  email: string,
  password: string
): Promise<AxiosResponse<RegisterResponse>> =>
  axios.post<RegisterResponse>(API_URL + '/users/register', {
    name,
    email,
    password
  });

export const confirm = async (
  email: string,
  code: string
): Promise<AxiosResponse<RegisterResponse>> =>
  axios.post<RegisterResponse>(API_URL + '/users/confirm', {
    email,
    code
  });
