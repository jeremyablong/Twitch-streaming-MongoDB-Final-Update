import React, { Component } from 'react';
import { reduxForm, Field } from "redux-form";
import SurveyField from "./surveyField.js";
import "./surveys-new.css";
import { Link } from "react-router-dom";
import validateEmails from "../../utils/validateEmails.js";

class SurveyForm extends Component {
	renderFields = () => {
		return (
			<div className="container">
				<Field 
					className="redux_form_one"
					type="text" 
					name="title" 
					component={SurveyField} 
					label="Survey Title"
				/>
				<div className="field_container">
					<Field 
						className="redux_form_one"
						type="text" 
						name="subject" 
						component={SurveyField} 
						label="Subject Line"
					/>
				</div>
				<Field 
					className="redux_form_one"
					type="text" 
					name="body" 
					component={SurveyField} 
					label="Email Body"
				/>
				<Field 
					className="redux_form_one"
					type="text" 
					name="emails" 
					component={SurveyField} 
					label="Recipient List"
				/>
			</div>
		);
	}
	render() {
		return (
			<div className="container">
				<div className="col-md-12">
					<form onSubmit={this.props.handleSubmit(() => {
						this.props.onSurveySubmit()
					})}>
						{this.renderFields()}
						<Link to="/surveys" className="btn btn-danger" style={{ margin: "20px 0px 0px 25px" }}>
							Cancel
						</Link>
						<div className="align_button">
							<button className="btn btn-info" type="submit"><i className="far fa-check-circle fa-2x"></i> SUBMIT</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

function validate (values) {
	
	const errors = {};

	errors.email = validateEmails(values.emails || "");

	if (!values.title) {
		errors.title = "You must provide a title"
	}
	if (!values.subject) {
		errors.subject = "You must provide a subject"
	}
	if (!values.body) {
		errors.body = "You must provide the email body"
	}
	if (!values.emails) {
		errors.emails = "You must provide emails"
	}

	return errors;
}

export default reduxForm({
	validate,
	form: "surveyForm",
	destroyOnUnmount: false
})(SurveyForm);