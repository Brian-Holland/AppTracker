import React, { useContext, useEffect } from 'react';
import Applications from '../applications/Applications';
import ApplicationForm from '../applications/ApplicationForm';
import ApplicationFilter from '../applications/ApplicationFilter';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
	const authContext = useContext(AuthContext);

	const { loadUser, user } = authContext;

	useEffect(() => {
		loadUser();
	}, []);

	return (
		<div className="grid-2">
			<div>
				<ApplicationForm />
			</div>
			<div>
				<h1 className="h2 text-primary text-center">{user && `${user.name}'s Applications`}</h1>
				<ApplicationFilter />
				<Applications />
			</div>
		</div>
	);
};

export default Home;
