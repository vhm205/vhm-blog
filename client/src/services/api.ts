import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';
import queryString from 'query-string';
import { config } from '../config/app';

const api: AxiosInstance = axios.create({
	baseURL: config.API_URL,
	timeout: 5000,
	responseType: 'json',
	params: (params: any) => queryString.stringify(params),
});

api.interceptors.request.use(
	(config: AxiosRequestConfig) => {
		return config;
	},
	(error) => error
);

api.interceptors.response.use(
	(response: AxiosResponse<any>) => {
		if (response && response.data) {
			return response.data;
		}

		return response;
	},
	(error) => error
);

export default api;
