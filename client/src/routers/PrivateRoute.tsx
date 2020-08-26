import React from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../utils';

const PrivateRoute: React.FC<RouteProps & { component: any }> = ({
	component: Component,
	...rest
}) => {
	return (
		<Route
			{...rest}
			render={(props) => {
				const { token, refreshToken } = props.match.params;
				if (!isAuthenticated && !token && !refreshToken) {
					return <Redirect to="/login" />;
				}

				return <Component {...props} />;
			}}
		/>
	);
};

export default PrivateRoute;
