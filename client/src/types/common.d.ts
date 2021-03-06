type Gender = 'Male' | 'Female';
type FormatTimeType = 'date' | 'time' | 'datetime' | 'human';
type responseWithMessage = AxiosResponse & { message: string };

type ErrorType =
	| {
			message: string;
	  }
	| { errors: Array<string> };

interface NotificationType {
	type: string | AlertProps;
	message: string;
	open?: boolean;
}

interface SocialAccountType {
	google: boolean;
	facebook: boolean;
}

interface PaginationType {
	perPage: number;
	total: number;
	page: number;
}
