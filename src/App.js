
import React, { lazy, useState, Suspense, useEffect } from 'react';
import {  HashRouter as Router, Redirect,  Switch,  Route,  Link as RouterLink,} from 'react-router-dom'
import { Navbar, Container } from 'react-bootstrap'


const Posts = lazy(() => import('./components/Posts'));
const User = lazy(() => import('./components/User'));
const PostPreview = lazy(() => import('./components/PostPreview'));

const App = () => {
	const [showLanguageSwitcher, setShowLanguageSwitcher] = useState(false);
	const pages = [
		{
			pageLink: '/',
			view: Posts,
			displayName: 'Home',
			showInNavbar: true,
		},
		{
			pageLink: '/user/:id',
			view: User,
			displayName: 'user',
			showInNavbar: true,
		},
		{
			pageLink: '/pview/:id',
			view: PostPreview,
			displayName: 'pview',
			showInNavbar: true,
		}
	];

	useEffect(() => {
		if (showLanguageSwitcher) {
			// For Chrome, Firefox, IE and Opera
			document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
			// For Safari
			document.body.scrollTo({ top: 0, behavior: 'smooth' });
		}
	}, [showLanguageSwitcher]);

	return (
			<Router>
		       <div className="App">
			<Navbar bg="light">
				<Container><Navbar.Brand href="/">Huddl.ai Posts</Navbar.Brand></Container>
			</Navbar>

			<Suspense fallback={<div />}>
				<Switch >
					{pages.map((page, index) => {
						return (
							<Route
								exact
								path={page.pageLink}
								render={({ match }) => <page.view {...match} />}
								key={index}
							/>
						);
					})}
					<Redirect to="/" />
				</Switch>
			</Suspense>
		</div >
			</Router>
	);
};

export default App;
