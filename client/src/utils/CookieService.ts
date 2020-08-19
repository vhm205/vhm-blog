import cookie from 'react-cookies';

class Cookie {
	get(name: string) {
		return cookie.load(name);
	}
	set(name: string, value: any, opt: any = { path: '/' }) {
		return cookie.save(name, value, opt);
	}
	remove(name: string) {
		return cookie.remove(name);
	}
	all() {
		return cookie.loadAll();
	}
}

export default new Cookie();
