import _ from "lodash";
import {
	CREATE_STREAM,
	FETCH_STREAMS,
	FETCH_STREAM,
	DELETE_STREAM,
	EDIT_STREAM,
	STREAM_TITLE,
	STREAM_DESCRIPTION
} from "../actions/types.js";

export default (state = {}, action) => {
	switch (action.type) {
		case FETCH_STREAMS:
			// return {
			// 	...state, streams: action.payload
			// }
			return { ...state, ..._.mapKeys(action.payload, "id") };
		
		case FETCH_STREAM:
			return { ...state, [action.payload.id]: action.payload};
			
		case CREATE_STREAM:
			return { ...state, [action.payload.id]: action.payload };
			
		case EDIT_STREAM:
			return { ...state, [action.payload.id]: action.payload };
			
		case DELETE_STREAM:
			return _.omit(state, action.payload); 

		case STREAM_DESCRIPTION:
			return {
				...state, Description: action.payload
			} 

		case STREAM_TITLE:
			return {
				...state, Title: action.payload
			}
			
		default:
			return state;
			
	}
}