import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { PublicRoute, PrivateRoute } from './routers';

// Components
import { Menu } from './components';
import { NotFound } from './components/errors';

// Pages
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile';
import AddPost from './pages/CMS/Posts/AddPost';
import AddCategory from './pages/CMS/Categories/AddCategory';
import AllPosts from './pages/CMS/Posts/ListPosts';

import { UserProvider } from './context/UserContext';
import { GlobalStyle } from './styles/globalStyle';

const App: React.FC = () => {
	return (
		<Router>
			<UserProvider>
				<Menu />
				<Switch>
					<PublicRoute path="/login" component={Login} />
					<PublicRoute path="/register" component={Register} />
					<PrivateRoute exact path="/profile" component={Profile} />
					<PrivateRoute
						path="/profile/:token/:refreshToken"
						component={Profile}
					/>
					<PrivateRoute path="/add-post" component={AddPost} />
					<PrivateRoute path="/add-category" component={AddCategory} />
					<PrivateRoute path="/all-posts" component={AllPosts} />
					<PublicRoute component={NotFound} />
				</Switch>
				<GlobalStyle />
			</UserProvider>
		</Router>
	);
};

export default App;
