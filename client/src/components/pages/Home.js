import React from 'react';
import Applications from '../applications/Applications';
import ApplicationForm from '../applications/ApplicationForm';

const Home = () => {
	return (
		<div className="grid-2">
			<div>
				<ApplicationForm />
			</div>
			<div>
				<Applications />
			</div>
		</div>
	);
};

export default Home;
