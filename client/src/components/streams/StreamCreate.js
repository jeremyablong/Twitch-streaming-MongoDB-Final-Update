import React, { Component } from "react"; 
import { connect } from "react-redux";
import { createStream } from "../../actions/index.js";
import StreamForm from "./streamForm.js";
import NavbarHome from "../navbar/navbar.js";

class StreamCreate extends Component {

	onSubmit = (formValues) => {
		this.props.createStream(formValues);

		this.props.history.push("/");
	};
	render() {
		return(
			<div>
				<div>
					<NavbarHome />
				</div>
				<div className="container">
					<h3 className="text-center blue_text"></h3>
					<StreamForm onSubmit={this.onSubmit} />
				</div>
			</div>
		);
	}
}

export default connect(null, { createStream })(StreamCreate);



//