import React, { useReducer } from 'react';
import axios from 'axios';
import ApplicationContext from './applicationContext';
import applicationReducer from './applicationReducer';
import {
	ADD_APPLICATION,
	DELETE_APPLICATION,
	GET_APPLICATIONS,
	CLEAR_APPLICATIONS,
	APPLICATION_ERROR,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_APPLICATION,
	FILTER_APPLICATIONS,
	CLEAR_FILTER
} from '../types';

const ApplicationState = (props) => {
	const initialState = {
		applications: null,
		current: null,
		filtered: null,
		error: null
	};
	const [ state, dispatch ] = useReducer(applicationReducer, initialState);

	//get applications
	const getApplications = async () => {
		try {
			//wait for axious to make get request to applications
			const res = await axios.get('/api/applications');

			//send the response from the get request as the dispatch payload to receive users apps
			dispatch({ type: GET_APPLICATIONS, payload: res.data });
		} catch (err) {
			dispatch({
				type: APPLICATION_ERROR,
				payload: err.response.msg
			});
		}
	};

	//add app
	const addApplication = async (application) => {
		//set headers to write to the db
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		try {
			//send axios post request using the application info and headers from the config variable
			const res = await axios.post('/api/applications', application, config);

			dispatch({ type: ADD_APPLICATION, payload: res.data });
		} catch (err) {
			dispatch({
				type: APPLICATION_ERROR,
				payload: err.response.msg
			});
		}
	};

	//delete app
	const deleteApplication = async (id) => {
		try {
			//send axios delete request using the apps unique id
			await axios.delete(`/api/applications/${id}`);

			dispatch({ type: DELETE_APPLICATION, payload: id });
		} catch (err) {
			dispatch({
				type: APPLICATION_ERROR,
				payload: err.response.msg
			});
		}
	};

	//update app
	const updateApplication = async (application) => {
		//set headers to send with config
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		try {
			//make axios put request using apps id and config headers
			const res = await axios.put(`/api/applications/${application._id}`, application, config);

			dispatch({ type: UPDATE_APPLICATION, payload: res.data });
		} catch (err) {
			console.error(err);
			dispatch({
				type: APPLICATION_ERROR,
				payload: err.response.msg
			});
		}
	};

	//clear applications
	const clearApplications = () => {
		dispatch({ type: CLEAR_APPLICATIONS });
	};

	//set current app
	const setCurrent = (application) => {
		dispatch({ type: SET_CURRENT, payload: application });
	};

	//clear current app
	const clearCurrent = () => {
		dispatch({ type: CLEAR_CURRENT });
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
				error: state.error,
				getApplications,
				addApplication,
				deleteApplication,
				setCurrent,
				clearCurrent,
				updateApplication,
				filterApplications,
				clearFilter,
				clearApplications
			}}
		>
			{props.children}
		</ApplicationContext.Provider>
	);
};

export default ApplicationState;
