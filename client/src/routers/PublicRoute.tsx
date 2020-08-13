import React from 'react';
import { Route, RouteProps } from 'react-router-dom';

const PublicRoute: React.FC<RouteProps & { component: any }> = ({
	component: Component,
	...rest
}) => {
	return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export default PublicRoute;
