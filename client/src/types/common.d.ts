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

interface ColumnCategory {
	id: 'stt' | 'name' | 'slug' | 'date';
	label: string;
	minWidth?: number;
	align?: 'right' | 'left' | 'center';
}
