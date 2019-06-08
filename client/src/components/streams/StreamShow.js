import React, { Component } from "react"; 
import { connect } from "react-redux";
import { fetchStream } from "../../actions/index.js";
import flv from "flv.js";
import NavbarHome from "../navbar/navbar.js";

class StreamShow extends Component {
constructor (props) {
	super(props);

	this.videoRef = React.createRef();

}
	componentDidMount () {
		const { id } = this.props.match.params;

		this.props.fetchStream(id);

		this.buildPlayer();
	}
	componentDidUpdate () {
		this.buildPlayer();
	}
	
	buildPlayer = () => {
		if (this.player || !this.props.stream) {
			return;
		}

		const { id } = this.props.match.params;

		this.flvPlayer = flv.createPlayer({
			type: "flv",
			url: `http://localhost:8000/live/${id}.flv`
		});
		this.flvPlayer.attachMediaElement(this.videoRef.current);
		this.flvPlayer.load();
	}


	render () {
		if (!this.props.stream) {
			return <h1 className="text-center loading"> Loading... </h1>
		}
		return (
		<div>
		<NavbarHome />
			<div className="col-md-12">
			<video 
				ref={this.videoRef} 
				style={{ width: "100%" }} 
				controls={true}
				autoPlay
			/>
				<h1 className="text-center live_stream_title">Title: {this.props.stream.title}</h1>
				<h4 className="text-center live_stream_description">Description: {this.props.stream.description} </h4>
			</div>
		</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return  {
		stream: state.streams[ownProps.match.params.id]
	}
}

export default connect(mapStateToProps, { fetchStream })(StreamShow);