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
	return config;
});

api.interceptors.response.use(
	(response: AxiosResponse) => {
		if (response && response.data) {
			return response.data;
		}

		return response;
	},
	(err) => {
		const { data, status } = err.response;
		const originReq = err.config;
		const refreshToken = cookie.load('refreshToken');

		if (
			data.message === 'Token is Expired' &&
			status === 401 &&
			refreshToken &&
			!originReq._retry
		) {
			originReq._retry = true;

			return api
				.get('/users/refresh-token', {
					headers: { authorization: `Bearer ${refreshToken}` },
				})
				.then((response: Omit<responseLogin, 'refreshToken' | 'message'>) => {
					const token = response.token;
					cookie.save('token', token, {});
					originReq.headers['authorization'] = `Bearer ${token}`;

					return axios(originReq);
				});
		}

		return Promise.reject(err);
	}
);

export default api;
