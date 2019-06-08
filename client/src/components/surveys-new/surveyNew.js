import React, { Component } from 'react';
// shows a form for a user to complete form
import { reduxForm } from "redux-form";
import SurveyForm from "./surveyForm.js";
import SurveyReview from "./surveyFormReview.js";

class SurveyNew extends Component {

	state = { 
		showFormReview: false
	}

	renderContent () {
		if (this.state.showFormReview) {
			return <SurveyReview onCancel={() => {
				this.setState({
					showFormReview: false
				})
			}} />
		} else {
			return <SurveyForm
				onSurveySubmit={() => {
					this.setState({
						showFormReview: true
					})
				}}
			 />
		}
	}

	render() {
		return (
			<div>
				<h1 className="text-center" style={{ marginTop: "50px" }}>Survey Form</h1>
				{this.renderContent()}
			</div>
		);
	}
}
export default reduxForm({
	form: "surveyForm"
})(SurveyNew);