import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';
import queryString from 'query-string';
import cookie from 'react-cookies';
import { config } from '../config/app';

const api: AxiosInstance = axios.create({
	baseURL: config.API_URL,
	timeout: 5000,
	responseType: 'json',
	params: (params: any) => queryString.stringify(params),
});

api.interceptors.request.use((config: AxiosRequestConfig) => {
	const token = cookie.load('token');
	if (token) {
		config.headers['authorization'] = `Bearer ${token}`;
	}
	return config;
});

api.interceptors.response.use((response: AxiosResponse) => {
	if (response && response.data) {
		return response.data;
	}

	return response;
});

export default api;
