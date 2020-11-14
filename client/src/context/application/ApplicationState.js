import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ApplicationContext from './applicationContext';
import applicationReducer from './applicationReducer';
import {
	ADD_APPLICATION,
	DELETE_APPLICATION,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_APPLICATION,
	FILTER_APPLICATIONS,
	CLEAR_FILTER
} from '../types';

const ApplicationState = (props) => {
	const initialState = {
		applications: [
			{
				id: 1,
				company: 'Google',
				positionTitle: 'Frontend Engineer',
				refNumber: '884823',
				notes: 'Appled on website'
			},
			{
				id: 2,
				company: 'Amazon',
				positionTitle: 'Software Engineer I',
				refNumber: 'E226452',
				notes: 'Applied on website'
			},
			{
				id: 3,
				company: 'Nexflix',
				positionTitle: 'Frontend Engineer',
				notes: 'applied through LinkedIn EasyApply'
			}
		],
		current: null,
		filtered: null
	};
	const [ state, dispatch ] = useReducer(applicationReducer, initialState);

	//add app
	const addApplication = (application) => {
		application.id = uuidv4();
		dispatch({ type: ADD_APPLICATION, payload: application });
	};

	//delete app
	const deleteApplication = (id) => {
		dispatch({ type: DELETE_APPLICATION, payload: id });
	};
	//set current app
	const setCurrent = (application) => {
		dispatch({ type: SET_CURRENT, payload: application });
	};
	//clear current app
	const clearCurrent = () => {
		dispatch({ type: CLEAR_CURRENT });
	};
	//update app
	const updateApplication = (application) => {
		dispatch({ type: UPDATE_APPLICATION, payload: application });
	};
	//filter apps
	const filterApplications = (text) => {
		dispatch({ type: FILTER_APPLICATIONS, payload: text });
	};

	//clear filter
	const clearFilter = () => {
		dispatch({ type: CLEAR_FILTER });
	};

	return (
		<ApplicationContext.Provider
			value={{
				applications: state.applications,
				current: state.current,
				filtered: state.filtered,
				addApplication,
				deleteApplication,
				setCurrent,
				clearCurrent,
				updateApplication,
				filterApplications,
				clearFilter
			}}
		>
			{props.children}
		</ApplicationContext.Provider>
	);
};

export default ApplicationState;
