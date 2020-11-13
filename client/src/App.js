import React, { Fragment } from 'react';
import Navbar from './components/layout/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/pages/Home';
import About from './components/pages/About';
import './App.css';

import ApplicationState from './context/application/ApplicationState';

const App = () => {
	return (
		<ApplicationState>
			<Router>
				<Fragment>
					<Navbar />
					<div className="container">
						<Switch>
							<Route exact path="/" component={Home} />
							<Route exact path="/about" component={About} />
						</Switch>
					</div>
				</Fragment>
			</Router>
		</ApplicationState>
	);
};

export default App;
