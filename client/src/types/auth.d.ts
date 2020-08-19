type Gender = 'Male' | 'Female';
type responseLogin = AxiosResponse & {
	token: string;
	refreshToken: string;
	message: string;
};
type responseRegister = AxiosResponse & { message: string };
type responseToken = AxiosResponse & { token: string };
type responseUser = AxiosResponse & User;

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

interface User {
	id: string;
	username: string;
	gender: Gender;
	phone: string;
	avatar: string;
	role: string;
	local: {
		email: string;
	};
}
