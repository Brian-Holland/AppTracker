import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const Login = (props) => {
	const alertContext = useContext(AlertContext);

	const authContext = useContext(AuthContext);

	const { setAlert } = alertContext;

	const { login, error, clearErrors, isAuthenticated } = authContext;

	useEffect(
		() => {
			//redirect if authenticated
			if (isAuthenticated) {
				props.history.push('/');
			}
			//alert error if user email already used
			if (error === 'Invalid credentials') {
				setAlert(error, 'danger');
				clearErrors();
			}
		},
		// eslint-disable-next-line
		[ error, isAuthenticated, props.history ]
	);

	const [ user, setUser ] = useState({
		email: '',
		password: ''
	});

	const { email, password } = user;

	const onChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		if (email === '' || password === '') {
			setAlert(error, 'danger');
		} else {
			login({ email, password });
		}
	};

	return (
		<div className="form-container">
			<h1 className="text-primary">Login</h1>
			<form onSubmit={onSubmit}>
				<div className="form-group">
					<label htmlFor="email">Email Address:</label>
					<input
						type="email"
						id="email"
						name="email"
						value={email}
						onChange={onChange}
						placeholder="Email"
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="password">Password:</label>
					<input
						type="password"
						id="password"
						name="password"
						value={password}
						onChange={onChange}
						placeholder="Password"
						required
					/>
				</div>
				<input type="submit" value="Login" className="btn btn-primary btn-block" />
			</form>
		</div>
	);
};

export default Login;
