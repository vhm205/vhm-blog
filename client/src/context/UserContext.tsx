import React, { createContext, useContext, SetStateAction } from 'react';
import UserAPI from '../services/userService';

interface UserContextType {
	user: User | null;
	setUser: (value: SetStateAction<User | null>) => void;
}

export const UserContext = createContext<UserContextType | null>(null);
export const useUser = () => useContext(UserContext);

export const UserProvider: React.FC = ({ children }) => {
	const [user, setUser] = React.useState<User | null>(null);

	React.useEffect(() => {
		(async () => {
			try {
				const user = new UserAPI();
				const result: responseUser = await user.profile();
				setUser(result);
				console.log(result);
			} catch (err) {
				console.error(err, err.response);
			}
		})();
	}, []);

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
};
