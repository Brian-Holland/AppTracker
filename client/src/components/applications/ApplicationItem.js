import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ApplicationContext from '../../context/application/applicationContext';

const ApplicationItem = ({ application }) => {
	const applicationContext = useContext(ApplicationContext);

	const { deleteApplication, setCurrent, clearCurrent } = applicationContext;

	const {
		_id,
		company,
		positionTitle,
		refNumber,
		appliedOn,
		appUrl,
		contactNumber,
		contactName,
		notes
	} = application;

	const onDelete = () => {
		deleteApplication(_id);
		clearCurrent();
	};

	return (
		<div className="card bg-light">
			<h3 className="text-primary text-left">{company} </h3>
			<ul className="list">
				<li>
					<strong>Job Title</strong>: {positionTitle}
				</li>
				{refNumber && (
					<li>
						<strong>Job ID</strong>: {refNumber}
					</li>
				)}
				{appliedOn && (
					<li>
						<strong>Applied On</strong>: {appliedOn}
					</li>
				)}
				{appUrl && (
					<li>
						<strong>Job URL</strong>:{' '}
						<a href={appUrl} target="_blank" rel="noreferrer noopener">
							{appUrl}
						</a>
					</li>
				)}
				{contactName && (
					<li>
						<strong>Contact Name</strong>: {contactName}
					</li>
				)}
				{contactNumber && (
					<li>
						<strong>Job ID</strong>: {contactNumber}
					</li>
				)}
				{notes && (
					<li>
						<strong>Notes</strong>: {notes}
					</li>
				)}
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
