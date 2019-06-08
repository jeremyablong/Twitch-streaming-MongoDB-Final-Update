import React, { Component } from "react"; 
import { Field, reduxForm } from "redux-form";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

class StreamForm extends Component {

	state = {
		streams: {}
	}

	renderError ({ error, touched }) {
		if (touched && error) {
			return <h6 id="error_message_one"> {error} </h6>
		}
	}
	renderInput = ({ input, label, meta }) => {
		const className = `form-control ${meta.error && meta.touched ? "is-invalid" : " " }`;
		return (
		<div>
			<label> {label} </label>
				<div className="input-group input-group-lg">
				  <input 
					  type="text" 
					  className={className}
					  aria-label="Large" 
					  aria-describedby="inputGroup-sizing-sm" 
					  { ...input } 
					  autoComplete="off"

				  />
			</div>
			{this.renderError(meta)}
			<hr className="black_line"/>
		</div>
		);
	};
	
	// componentDidMount () {
	// 	axios.get("/streams")
	// 		.then((res) => {
	// 			console.log(res);
	// 		}).then((streams) => {
	// 			this.setState({
	// 				streams: streams
	// 			}, () => {
	// 				console.log("Streams Fetched", streams);
	// 			})
	// 		})
	// }

	onSubmit = (formValues) => {
		this.props.onSubmit(formValues);
	};
	// THIS GETS THE DATA FROM - ROUTES -  SUBMITFORM.JS
	render() {
		return(
			<div className="container">
				<form method="POST" action="/" onSubmit={this.props.handleSubmit(this.onSubmit)}>
					<Field name="title" component={this.renderInput} label="Enter Title Of Stream"/>
					<Field name="description" component={this.renderInput} label="Enter Description Of Stream"/>
						<button type="submit" value="submit" className="btn btn-danger form_button">Click To Create Stream</button>
				</form>
			</div>
		);
	}
}

const validate = (formValues) => {
	const errors = {};
	if (!formValues.title) {
		errors.title = "You Must Enter A Title";
	} 
	if (!formValues.description) {
		errors.description = "You Must Enter A Description";
	}
	return errors;
};


export default reduxForm({
	form: "StreamForm",
	validate
})(StreamForm);




//