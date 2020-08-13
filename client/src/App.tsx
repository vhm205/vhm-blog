import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { PublicRoute } from './routers';

// Components
import { NavBar } from './components';
import { NotFound } from './components/errors';

// Pages
import Login from './components/pages/Login/Login';
import Register from './components/pages/Register/Register';

import { GlobalStyle } from './styles/globalStyle';

const App: React.FC = () => {
	return (
		<Router>
			<NavBar />
			<Switch>
				<PublicRoute path="/login" component={Login} />
				<PublicRoute path="/register" component={Register} />
				<PublicRoute component={NotFound} />
			</Switch>
			<GlobalStyle />
		</Router>
	);
};

export default App;
