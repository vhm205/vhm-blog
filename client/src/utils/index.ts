import { RefObject } from 'react';
import cookie from 'react-cookies';

export const isAuthenticated = !!(
	cookie.load('token') && cookie.load('refreshToken')
);

export const checkSocialAccount = (user: User) => {
	return !!user.google || !!user.facebook;
};

export const showPreviewAvatar = (
	file: File,
	thumb: RefObject<HTMLImageElement>
) => {
	const reader = new FileReader();
	reader.onloadend = () => {
		if (thumb.current) {
			thumb.current.src = reader.result as string;
		}
	};
	reader.readAsDataURL(file);
};

export const validImage = (file: File): { status: string; message: string } => {
	const typeValid = [
		'image/png',
		'image/jpg',
		'image/jpeg',
		'image/bmp',
		'image/gif',
	];

	if (!typeValid.includes(file.type)) {
		return {
			status: 'error',
			message: 'The file is not in the correct format',
		};
	}

	if (file.size > 1048576) {
		return {
			status: 'error',
			message: 'File not larger than 1 MB',
		};
	}

	return {
		status: 'success',
		message: 'ok',
	};
};

export const setInputFilter = (
	textBox: Element,
	inputFilter: (value: string) => boolean
) => {
	[
		'input',
		'keydown',
		'keyup',
		'mousedown',
		'mouseup',
		'select',
		'contextmenu',
		'drop',
	].forEach(function (event) {
		textBox.addEventListener(event, function (
			this: (HTMLInputElement | HTMLTextAreaElement) & {
				oldValue: string;
				oldSelectionStart: number | null;
				oldSelectionEnd: number | null;
			}
		) {
			if (inputFilter(this.value)) {
				this.oldValue = this.value;
				this.oldSelectionStart = this.selectionStart;
				this.oldSelectionEnd = this.selectionEnd;
			} else if (Object.prototype.hasOwnProperty.call(this, 'oldValue')) {
				this.value = this.oldValue;
				if (this.oldSelectionStart !== null && this.oldSelectionEnd !== null) {
					this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
				}
			} else {
				this.value = '';
			}
		});
	});
};
