import React, { Component } from "react"; 
import { connect } from "react-redux";
import { fetchStream, editStream } from "../../actions/index.js";
import StreamForm from "./streamForm.js";
import _ from "lodash";
import NavbarHome from "../navbar/navbar.js";

class StreamEdit extends Component {

	componentDidMount () {
		this.props.fetchStream(this.props.match.params.id);
	};
	onSubmit = (formValues) => {
		this.props.editStream(this.props.match.params.id, formValues);
	}
	render() {
		if (!this.props.stream) {
			return <h3> Loading... </h3>
		};
		return (
		<div>
		<NavbarHome />
			<div>
			<h1 className="edit_title text-center">Edit A Stream</h1>
				<h3 className="text-center"><span className="span_blue"> Title:</span> {this.props.stream.title} </h3>
				<h3 className="text-center"><span className="span_blue">Description:</span> {this.props.stream.description} </h3>
				<StreamForm 
					initialValues={ _.pick(this.props.stream, "title", "description") } 
					onSubmit={this.onSubmit}
				/>
			</div>
		</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);