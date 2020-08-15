type responseLogin = AxiosResponse & { token: string; refreshToken: string };

interface LoginField {
	email: string;
	password: string;
	remember: boolean;
	message?: string;
}

interface RegisterField {
	username: string;
	email: string;
	password: string;
	repass: string;
	message?: string;
}
