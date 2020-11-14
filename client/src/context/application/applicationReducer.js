import {
	ADD_APPLICATION,
	DELETE_APPLICATION,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_APPLICATION,
	FILTER_APPLICATIONS,
	CLEAR_FILTER
} from '../types';

export default (state, action) => {
	switch (action.type) {
		case ADD_APPLICATION:
			return {
				...state,
				applications: [ ...state.applications, action.payload ]
			};
		case UPDATE_APPLICATION:
			return {
				...state,
				applications: state.applications.map(
					(application) => (application.id === action.payload.id ? action.payload : application)
				)
			};
		case DELETE_APPLICATION:
			return {
				...state,
				applications: [ ...state.applications.filter((application) => application.id !== action.payload) ]
			};
		case SET_CURRENT:
			return {
				...state,
				current: action.payload
			};
		case CLEAR_CURRENT:
			return {
				...state,
				current: null
			};
		case FILTER_APPLICATIONS:
			return {
				...state,
				filtered: state.applications.filter((application) => {
					const regex = new RegExp(`${action.payload}`, 'gi');
					return (
						(application.company && application.company.match(regex)) ||
						(application.positionTitle && application.positionTitle.match(regex)) ||
						(application.refNumber && application.refNumber.match(regex)) ||
						(application.contactName && application.contactName.match(regex)) ||
						(application.notes && application.notes.match(regex))
					);
				})
			};
		case CLEAR_FILTER:
			return {
				...state,
				filtered: null
			};
		default:
			return state;
	}
};
