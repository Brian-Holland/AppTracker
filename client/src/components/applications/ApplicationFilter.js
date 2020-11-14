import React, { useContext, useRef, useEffect } from 'react';
import ApplicationContext from '../../context/application/applicationContext';

const ApplicationFilter = () => {
	const applicationContext = useContext(ApplicationContext);

	const text = useRef('');

	const { filterApplications, clearFilter, filtered } = applicationContext;

	useEffect(() => {
		if (filtered === null) {
			text.current.value = '';
		}
	});

	const onChange = (e) => {
		if (text.current.value !== '') {
			filterApplications(e.target.value);
		} else {
			clearFilter();
		}
	};
	return (
		<form>
			<input ref={text} type="text" placeholder="Filter Applications" onChange={onChange} />
		</form>
	);
};

export default ApplicationFilter;
