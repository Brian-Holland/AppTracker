import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ApplicationContext from '../../context/application/applicationContext';

const ApplicationItem = ({ application }) => {
	const applicationContext = useContext(ApplicationContext);

	const { deleteApplication, setCurrent, clearCurrent } = applicationContext;

	const { id, company, positionTitle, refNumber, appliedOn, appUrl, contactNumber, contactName, notes } = application;

	const onDelete = () => {
		deleteApplication(id);
		clearCurrent();
	};

	return (
		<div className="card bg-light">
			<h3 className="text-primary text-left">{company} </h3>
			<ul className="list">
				<li>Job Title: {positionTitle}</li>
				{refNumber && <li>Job ID: {refNumber}</li>}
				{appliedOn && <li>Applied On: {appliedOn}</li>}
				{appUrl && <li>Job URL: {appUrl}</li>}
				{contactName && <li>Contact Name: {contactName}</li>}
				{contactNumber && <li>Job ID: {contactNumber}</li>}
				{notes && <li>Notes: {notes}</li>}
			</ul>
			<p>
				<button className="btn btn-primary btn-sm" onClick={() => setCurrent(application)}>
					Edit
				</button>
				<button className="btn btn-danger btn-sm" onClick={onDelete}>
					Delete
				</button>
			</p>
		</div>
	);
};

ApplicationItem.propTypes = {
	application: PropTypes.object.isRequired
};

export default ApplicationItem;
