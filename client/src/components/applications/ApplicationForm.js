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
			<input type="text" placeholder="Company" name="company" value={company} onChange={onChange} required />
			<input
				type="text"
				placeholder="Job Title"
				name="positionTitle"
				value={positionTitle}
				onChange={onChange}
				required
			/>
			<input type="text" placeholder="Job ID" name="refNumber" value={refNumber} onChange={onChange} />
			<input type="date" placeholder="Date Applied" name="appliedOn" value={appliedOn} onChange={onChange} />
			<input type="text" placeholder="Application URL" name="appUrl" value={appUrl} onChange={onChange} />
			<input type="text" placeholder="Contact Name" name="contactName" value={contactName} onChange={onChange} />
			<input
				type="text"
				placeholder="Contact Number/Email"
				name="contactNumber"
				value={contactNumber}
				onChange={onChange}
			/>
			<textarea placeholder="Notes" name="notes" value={notes} onChange={onChange} />
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
		</form>
	);
};

export default ApplicationForm;
