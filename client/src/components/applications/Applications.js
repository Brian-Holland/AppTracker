import React, { Fragment, useContext, useEffect } from 'react';
import ApplicationItem from './ApplicationItem';
import ApplicationContext from '../../context/application/applicationContext';
import Spinner from '../layout/Spinner';

const Applications = () => {
	const applicationContext = useContext(ApplicationContext);

	const { getApplications, applications, filtered, loading } = applicationContext;

	useEffect(() => {
		getApplications();
		//eslint-disable-next-line
	}, []);

	if (applications !== null && applications.length === 0 && !loading) {
		return <h4>Please add applications</h4>;
	}

	return (
		<div className="scroll-box">
			{applications !== null && !loading ? (
				<Fragment>
					{filtered !== null ? (
						filtered.map((application) => (
							<ApplicationItem key={application._id} application={application} />
						))
					) : (
						applications.map((application) => (
							<ApplicationItem key={application._id} application={application} />
						))
					)}
				</Fragment>
			) : (
				<Spinner />
			)}
		</div>
	);
};

export default Applications;
