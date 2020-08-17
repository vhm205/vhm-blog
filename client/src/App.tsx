import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { PublicRoute, PrivateRoute } from './routers';

// Components
import { NavBar } from './components';
import { NotFound } from './components/errors';

// Pages
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile';

import { GlobalStyle } from './styles/globalStyle';

const App: React.FC = () => {
	return (
		<Router>
			<NavBar />
			<Switch>
				<PublicRoute path="/login" component={Login} />
				<PublicRoute path="/register" component={Register} />
				<PrivateRoute path="/profile" component={Profile} />
				<PublicRoute component={NotFound} />
			</Switch>
			<GlobalStyle />
		</Router>
	);
};

export default App;
