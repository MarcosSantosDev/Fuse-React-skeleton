import { env } from '@root/env';
import axios from 'axios';

import { ACCESS_TOKEN } from '../constants/localStore';

const axiosInstance = () => {
	const axiosInstance = axios.create({
		baseURL: env.VITE_API_URL
	});

	axiosInstance.interceptors.request.use(
		(config) => {
			const token = localStorage.getItem(ACCESS_TOKEN);

			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
			return config;
		},
		(error) => {
			return Promise.reject(error);
		}
	);

	return axiosInstance;
};

const apiClient = axiosInstance();

export { apiClient };
