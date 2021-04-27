import React, { useState, useContext, useEffect } from 'react';
import ApplicationContext from '../../context/application/applicationContext';

const ApplicationForm = () => {
	const applicationContext = useContext(ApplicationContext);

	const { addApplication, updateApplication, current, clearCurrent } = applicationContext;

	useEffect(
		() => {
			if (current !== null) {
				setApplication(current);
			} else {
				setApplication({
					company: '',
					positionTitle: '',
					refNumber: '',
					appliedOn: '',
					appUrl: '',
					contactName: '',
					contactNumber: '',
					notes: ''
				});
			}
		},
		[ applicationContext, current ]
	);

	const [ application, setApplication ] = useState({
		company: '',
		positionTitle: '',
		refNumber: '',
		appliedOn: '',
		appUrl: '',
		contactName: '',
		contactNumber: '',
		notes: ''
	});

	const { company, positionTitle, refNumber, appliedOn, appUrl, contactName, contactNumber, notes } = application;

	//handle changes by using event targets name and setting it to the target value
	const onChange = (e) => {
		setApplication({ ...application, [e.target.name]: e.target.value });
	};

	//handle submit
	const onSubmit = (e) => {
		e.preventDefault();
		if (current === null) {
			//add new app
			addApplication(application);
		} else {
			updateApplication(application);
		}
		clearAll();

		//set form back to empty
		setApplication({
			company: '',
			positionTitle: '',
			refNumber: '',
			appliedOn: '',
			appUrl: '',
			contactName: '',
			contactNumber: '',
			notes: ''
		});
	};

	const clearAll = () => {
		clearCurrent();
	};

	return (
		<form onSubmit={onSubmit}>
			<h1 className="h2 text-primary text-center">
				{current ? 'Edit Application Info' : 'Add Application Info'}
			</h1>
			<div className="app-form">
				<label htmlFor="company">Company:</label>
				<input
					type="text"
					id="company"
					placeholder="Company"
					name="company"
					value={company}
					onChange={onChange}
					required
				/>
				<label htmlFor="positionTitle">Job Title:</label>
				<input
					type="text"
					id="positionTitle"
					placeholder="Job Title"
					name="positionTitle"
					value={positionTitle}
					onChange={onChange}
					required
				/>
				<label htmlFor="refNumber">Job ID:</label>
				<input
					type="text"
					id="refNumber"
					placeholder="Job ID"
					name="refNumber"
					value={refNumber}
					onChange={onChange}
				/>
				<label htmlFor="appliedOn">Date Applied:</label>
				<input
					type="text"
					id="appliedOn"
					placeholder="Date Applied"
					name="appliedOn"
					value={appliedOn}
					onChange={onChange}
				/>
				<label htmlFor="appUrl">Application URL:</label>
				<input
					type="text"
					id="appUrl"
					placeholder="Application URL"
					name="appUrl"
					value={appUrl}
					onChange={onChange}
				/>
				<label htmlFor="contactName">Contact Name:</label>
				<input
					type="text"
					id="contactName"
					placeholder="Contact Name"
					name="contactName"
					value={contactName}
					onChange={onChange}
				/>
				<label htmlFor="contactNumber">Contact Number:</label>
				<input
					type="text"
					id="contactNumber"
					placeholder="Contact Number/Email"
					name="contactNumber"
					value={contactNumber}
					onChange={onChange}
				/>
				<label htmlFor="notes">Additional Notes:</label>
				<textarea id="notes" placeholder="Notes" name="notes" value={notes} onChange={onChange} />
				<div>
					<input
						type="submit"
						value={current ? 'Update Application' : 'Add Application'}
						className="btn btn-primary btn-block"
					/>
				</div>
				{current && (
					<div>
						<button className="btn btn-light btn-block" onClick={clearAll}>
							Clear
						</button>
					</div>
				)}
			</div>
		</form>
	);
};

export default ApplicationForm;
