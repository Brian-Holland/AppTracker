import React from 'react';
import Applications from '../applications/Applications';
import ApplicationForm from '../applications/ApplicationForm';
import ApplicationFilter from '../applications/ApplicationFilter';

const Home = () => {
	return (
		<div className="grid-2">
			<div>
				<ApplicationForm />
			</div>
			<div>
				<ApplicationFilter />
				<Applications />
			</div>
		</div>
	);
};

export default Home;
