import axios from 'axios';

import { RegisterData, RegisterResponse } from 'modules/interfaces/user';
import { API_URL } from 'config';

export const registerUser = async (data: RegisterData) => {
  return axios.post<RegisterResponse>(`${API_URL}/users/register`, data);
};
