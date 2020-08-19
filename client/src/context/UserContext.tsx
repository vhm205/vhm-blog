import React, { createContext, useContext, SetStateAction } from 'react';
import UserAPI from '../services/userService';
import { isAuthenticated } from '../utils';

interface UserContextType {
	user: User;
	setUser: (value: SetStateAction<User | undefined>) => void;
}

export const UserContext = createContext<Partial<UserContextType>>({});
export const useUser = () => useContext(UserContext);

export const UserProvider: React.FC = ({ children }) => {
	const [user, setUser] = React.useState<User>();

	React.useEffect(() => {
		if (isAuthenticated) {
			(async () => {
				try {
					const user = new UserAPI();
					const result: responseUser = await user.profile();
					setUser(result.data ? result.data : result);
				} catch (err) {
					console.error(err, err.response);
				}
			})();
		}
	}, []);

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
};
