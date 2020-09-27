import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { PublicRoute, PrivateRoute } from './routers';

// Components
import { Menu as MenuCMS } from './components';
import { NotFound } from './components/errors';
import Menu from './pages/Main/components/Menu';

// Pages
import Home from './pages/Main/Home';
import PostDetail from './pages/Main/LeftSide/PostDetail';

import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile';

import AddPost from './pages/CMS/Posts/AddPost';
import EditPost from './pages/CMS/Posts/EditPost';
import AllPosts from './pages/CMS/Posts/ListPosts';
import Category from './pages/CMS/Categories/Category';

import { UserProvider } from './context/UserContext';
import { GlobalStyle } from './styles/globalStyle';
import { isAuthenticated } from './utils';

const App: React.FC = () => {
	return (
		<Router>
			<UserProvider>
				{isAuthenticated ? <MenuCMS /> : <Menu />}
				<Switch>
					<Route path="/" exact component={Home} />
					<PublicRoute path="/category/:category" exact component={Home} />
					<PublicRoute path="/:category/:slug" exact component={PostDetail} />
					<PublicRoute path="/login" component={Login} />
					<PublicRoute path="/register" component={Register} />
					<PrivateRoute exact path="/profile" component={Profile} />
					<PrivateRoute
						path="/profile/:token/:refreshToken"
						component={Profile}
					/>
					<PrivateRoute path="/add-post" component={AddPost} />
					<PrivateRoute path="/edit-post/:post_id" component={EditPost} />
					<PrivateRoute path="/all-posts" component={AllPosts} />
					<PrivateRoute path="/category" component={Category} />
					<Route component={NotFound} />
				</Switch>
				<GlobalStyle />
			</UserProvider>
		</Router>
	);
};

export default App;
