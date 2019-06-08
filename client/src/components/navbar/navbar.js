import React, { Component } from 'react';
import "./navbar.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Payments from "../stripe-payments/payments.js";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';


class NavbarHome extends Component {
constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

	toggleNavbar() {
	    this.setState({
	      collapsed: !this.state.collapsed
	    });
	};
	renderContent () {
		switch (this.props.auth) {
			case null:
				return "Still Deciding..."
			case false:
				return (
					<a id="to_google_link" href="/auth/google">
				      <button type="button" className="btn btn-outline-info google_signin_button"><i className="fab fa-google-plus-g fa-2x"></i>  Click To Sign In With Google </button>
				    </a>
				);
			default:
				return (
					<div>
						<Payments />
						<a id="to_google_link" href="/api/logout">
					      <button type="button" className="btn btn-outline-info google_signin_button"><i className="fab fa-google-plus-g fa-2x"></i>  Click To Sign-Out! </button>
					    </a>
					</div>
				);
		}
	};
	renderPayment = () => {
		switch (this.props.auth) {
		  case null: 
		  	return "still deciding"
		  case false:  
		  	return (
			  	<div>
					<a id="to_google_link mobile_disappear" href="/auth/google">
				      <button style={{ marginRight: "70px"}} type="button" className="btn btn-outline-info google_signin_button"><i className="fab fa-google-plus-g fa-2x"></i>  Click To Sign In With Google </button>
				    </a>
				</div>
		  	);
          default:
          	return (
		         <div>
		          	<div className="payments">
						<Payments />
		          	</div>
		          	<a id="to_google_link mobile_disappear" href="/api/logout">
						<button type="button" className="btn btn-outline-info google_signin_button hide"><i className="fab fa-google-plus-g fa-2x"></i>  Click To Sign-Out! </button>
					</a>
				</div>
          	);
		}
	};
	renderAvaliableCredits = () => {
		switch (this.props.auth) {
			case null: 
				return "Still Deciding..."
			case false: 
				return (
					<div></div>
				);
			default:
				return (
	              <h3 className="avaliable_desktop">AVALIABLE CREDITS: <span className="avaliable_credits_span">{this.props.auth.credits}</span></h3>
				);

		};
	};
	renderAvaliableCreditsDropdown = () => {
		switch (this.props.auth) {
			case null: 
				return "Still Deciding..."
			case false: 
				return (
					<div></div>
				);
			default:
				return (
	              <NavItem>
	              	<h3 className="avaliable_mobile">AVALIABLE CREDITS: <span className="avaliable_credits_span">{this.props.auth.credits}</span></h3>
	              </NavItem>
				);

		};
	};
	render() {
		return (
			<div>
		        <Navbar className="nav" color="faded" light>
		          <h3 className="mr-auto">Mail Me Back Email Forwarding - Homepage {this.renderPayment()}</h3>
				  {this.renderAvaliableCredits()}
		          <NavbarToggler id="nav_toggler" onClick={this.toggleNavbar} className="mr-2" >  Click To Toggle Menu  </NavbarToggler>
		          <Collapse isOpen={!this.state.collapsed} navbar>
		            <Nav navbar>
		            <NavItem>
		                <NavLink href="/">Home</NavLink>
		              </NavItem>
		              <NavItem>
		                <NavLink href="/streams/new">Create A Stream</NavLink>
		              </NavItem>
		              <NavItem>
		                <NavLink href="/">Home</NavLink>
		              </NavItem>
		              <NavItem>
		              	{this.renderContent()}
		              </NavItem>
						{this.renderAvaliableCreditsDropdown()}
		            </Nav>
		          </Collapse>
		        </Navbar>
		    </div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		auth: state.auth
	}
}

export default connect(mapStateToProps, {  })(NavbarHome);