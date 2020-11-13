import React from 'react';

const ApplicationItem = ({ application }) => {
	const { company, positionTitle, refNumber, appliedOn, appUrl, contactNumber, contactName, notes } = application;

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
				<button className="btn btn-primary btn-sm">Edit</button>
				<button className="btn btn-danger btn-sm">Delete</button>
			</p>
		</div>
	);
};

export default ApplicationItem;
