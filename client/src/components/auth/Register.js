import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Register = (props) => {
	const alertContext = useContext(AlertContext);

	const authContext = useContext(AuthContext);

	const { setAlert } = alertContext;

	const { register, error, clearErrors, isAuthenticated } = authContext;

	useEffect(
		() => {
			//redirect if authenticated
			if (isAuthenticated) {
				props.history.push('/');
			}
			//alert error if user email already used
			if (error === 'User already exists') {
				setAlert(error, 'danger');
				clearErrors();
			}
		},
		// eslint-disable-next-line
		[ error, isAuthenticated, props.history ]
	);

	const [ user, setUser ] = useState({
		name: '',
		email: '',
		password: '',
		password2: ''
	});

	const { name, email, password, password2 } = user;

	const onChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		if (name === '' || email === '' || password === '') {
			setAlert('Please enter all fields', 'danger');
		} else if (password !== password2) {
			setAlert('Passwords do not match', 'danger');
		} else {
			register({
				name,
				email,
				password
			});
		}
	};

	return (
		<div className="form-container">
			<h1 className="text-primary">Register Account</h1>
			<form onSubmit={onSubmit}>
				<div className="form-group">
					<label htmlFor="name">Name:</label>
					<input
						type="text"
						id="name"
						name="name"
						value={name}
						placeholder="Name"
						onChange={onChange}
						required
					/>
				</div>
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
						minLength="6"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="password2">Confirm Password:</label>
					<input
						type="password"
						id="password2"
						name="password2"
						value={password2}
						onChange={onChange}
						placeholder="Confirm password"
						required
						minLength="6"
					/>
				</div>
				<input type="submit" value="Register" className="btn btn-primary btn-block" />
			</form>
		</div>
	);
};

export default Register;
