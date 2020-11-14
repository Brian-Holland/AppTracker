import React, { Fragment, useContext } from 'react';
import ApplicationItem from './ApplicationItem';
import ApplicationContext from '../../context/application/applicationContext';

const Applications = () => {
	const applicationContext = useContext(ApplicationContext);

	const { applications, filtered } = applicationContext;

	if (applications.length === 0) {
		return <h4>Please add applications</h4>;
	}

	return (
		<Fragment>
			{filtered !== null ? (
				filtered.map((application) => <ApplicationItem key={application.id} application={application} />)
			) : (
				applications.map((application) => <ApplicationItem key={application.id} application={application} />)
			)}
		</Fragment>
	);
};

export default Applications;
