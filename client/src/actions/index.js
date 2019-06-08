import axios from "axios";
import { FETCH_USER, FETCH_SURVEYS } from "./types.js";
import streams from "../apis/streams.js";
import { 
	SIGN_IN, 
	SIGN_OUT, 
	CREATE_STREAM, 
	FETCH_STREAMS, 
	FETCH_STREAM, 
	DELETE_STREAM, 
	EDIT_STREAM } from "../actions/types.js";
import history from "../history.js";

export const changeLogin = (shouldBeLoggedIn) => {
	return {
		type: "change_auth",
		payload: shouldBeLoggedIn
	};
};

export const fetchUser = () => {
	return function (dispatch) {
		axios.get("/api/currentUser")
			.then((res) => {
				dispatch({ type: "FETCH_USER", payload: res.data });
			});
	};
};

export const handleToken = (token) => async dispatch => {
	const res = await axios.post("/api/stripe", token);

	dispatch({ type: "FETCH_USER", payload: res.data});
};

export const submitSurvey = (values, history) => async dispatch => {
	const res = await axios.post("/api/surveys", values);


	dispatch({ type: "FETCH_USER", payload: res.data })
};

export const fetchSurveys = () => async dispatch => {
	const res = await axios.get("/api/surveys");
	console.log(res);
	dispatch({ type: FETCH_SURVEYS, payload: res.data });
}


export const signIn = (dispatch) => {

	dispatch({ type: "SIGN_IN", isSignedIn: true })

}

export const signOut = (dispatch) => {

	dispatch({ type: "SIGN_OUT", isSignedIn: false })

}

export const createStream = formValues => async (dispatch, getState) => {
	const { userId } = getState().auth;
		const response = await streams.post("/streams", { ...formValues, userId });
		
		dispatch({ type: CREATE_STREAM, payload: response.data });
		history.push("/");
};

export const fetchStreams = () => async dispatch => {
	const response = await streams.get("/streams");
	
	dispatch({
		type: FETCH_STREAMS, payload: response.data
	})
};
export const fetchStream = (id) => async dispatch => {
	const response = await streams.get(`/streams/${id}`);

	dispatch({
		type: FETCH_STREAM, payload: response.data
	})
};
export const deleteStream = (id) => async dispatch => {
	console.log(id);
	const response = await streams.delete(`/streams/${id}`, id);

	dispatch({
		type: DELETE_STREAM, payload: id
	})
};
export const editStream = (id, formValues) => async dispatch => {
	const response = await streams.patch(`/streams/${id}`, formValues);

	dispatch({
		type: EDIT_STREAM, payload: response.data
	})
	history.push("/")
};


