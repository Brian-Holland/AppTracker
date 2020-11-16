import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import ApplicationContext from '../../context/application/applicationContext';

const Navbar = ({ title, icon }) => {
	const authContext = useContext(AuthContext);
	const applicationContext = useContext(ApplicationContext);

	const { isAuthenticated, logout } = authContext;

	const { clearApplications } = applicationContext;

	const onLogout = () => {
		logout();
		clearApplications();
	};

	const authLinks = (
		<Fragment>
			<li>
				<a onClick={onLogout} href="#">
					<i className="fas fa-sign-out-alt" /> Logout
				</a>
			</li>
		</Fragment>
	);

	const guestLinks = (
		<Fragment>
			<li>
				<Link to="/register">
					<i class="fas fa-user-plus" /> Register
				</Link>
			</li>
			<li>
				<Link to="/login">
					<i class="fas fa-user" /> Login
				</Link>
			</li>
		</Fragment>
	);

	return (
		<div className="navbar bg-primary">
			<h1>
				<i className={icon} style={{ marginRight: '1rem' }} /> {title}
			</h1>
			<ul>{isAuthenticated ? authLinks : guestLinks}</ul>
		</div>
	);
};

Navbar.propTypes = {
	title: PropTypes.string.isRequired,
	icon: PropTypes.string
};

Navbar.defaultProps = {
	title: 'AppTracker',
	icon: 'far fa-newspaper'
};

export default Navbar;
