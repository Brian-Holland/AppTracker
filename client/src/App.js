import React, { Fragment } from 'react';
import Navbar from './components/layout/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Register from './components/auth/Register';
import './App.css';

import ApplicationState from './context/application/ApplicationState';
import AuthState from './context/auth/AuthState';

const App = () => {
	return (
		<AuthState>
			<ApplicationState>
				<Router>
					<Fragment>
						<Navbar />
						<div className="container">
							<Switch>
								<Route exact path="/" component={Home} />
								<Route exact path="/about" component={About} />
								<Route exact path="/register" component={Register} />
							</Switch>
						</div>
					</Fragment>
				</Router>
			</ApplicationState>
		</AuthState>
	);
};

export default App;
