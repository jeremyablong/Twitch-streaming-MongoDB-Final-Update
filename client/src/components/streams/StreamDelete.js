import React, { Component } from "react"; 
import { connect } from "react-redux";
import { fetchStream, deleteStream } from "../../actions/index.js";
import Modal from 'react-modal';
import history from "../../history.js";
import { Link } from "react-router-dom";

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    boxShadow 			  : "7px 7px 7px 7px grey"
  }
};


class StreamDelete extends Component {
  constructor() {
    super();
 
    this.state = {
      modalIsOpen: true
    };

    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }
 
  closeModal() {
    this.setState({modalIsOpen: false});
  }
 
	componentDidMount () {
		this.props.fetchStream(this.props.match.params.id);
	}


	render() {
		const id = this.props.match.params.id;
		return (
			 <div onClick={(event) => history.push("/")}>
        
		        <Modal 
		          ariaHideApp={false}
		          isOpen={this.state.modalIsOpen}
		          onAfterOpen={this.afterOpenModal}
		          onRequestClose={this.closeModal}
		          style={customStyles}
		          contentLabel="Example Modal" 

		        >
		 
				  <div className="modal-dialog" role="document">
				    <div className="modal-content">
				      <div className="modal-header">
				        <h5 ref={subtitle => this.subtitle = subtitle} className="modal-title" id="exampleModalLabel">ARE YOU SURE YOU WANT TO DELETE THIS STREAM?</h5>
				        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
				          <span aria-hidden="true">&times;</span>
				        </button>
				      </div>
				      <div className="modal-body">
				        Are you sure you want to delete this stream? There is no way to undo this action. Please make sure this is what you really want to do. If you would like to continue, click "DELETE THIS STREAM".
				      </div>
				      <div className="modal-footer">
				        <Link to="/">
				        	<button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.closeModal}>CANCEL</button>
				        </Link>

				        <button type="button" className="btn btn-danger" onClick={() => this.props.deleteStream(id)}>DELETE THIS STREAM</button>
				      </div>
				    </div>
				  </div>
				
        </Modal>
      </div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		stream: state.streams[ownProps.match.params.id],
		ID: state.auth._id
	}
}

export default connect(mapStateToProps, { fetchStream,  deleteStream })(StreamDelete);