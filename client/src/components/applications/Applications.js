import React, { Fragment, useContext } from 'react';
import ApplicationItem from './ApplicationItem';
import ApplicationContext from '../../context/application/applicationContext';

const Applications = () => {
	const applicationContext = useContext(ApplicationContext);

	const { applications } = applicationContext;

	return (
		<Fragment>
			{applications.map((application) => <ApplicationItem key={application.id} application={application} />)}
		</Fragment>
	);
};

export default Applications;
