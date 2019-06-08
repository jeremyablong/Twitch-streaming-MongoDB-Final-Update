import React, { Component } from 'react';
import ReactStripeCheckout from "react-stripe-checkout";
import "./payments.css";
import { connect } from "react-redux";
import { handleToken } from "../../actions/index.js";


class Payments extends Component {
	render() {
		return (
		<div className="pay_with_card">
			<ReactStripeCheckout 
				amount={500}
				token={(token) => {
					this.props.handleToken(token);
				}}
				stripeKey={process.env.REACT_APP_STRIPE_KEY}
				name="Mail Me Back Forwarding!"
				description="$5 for 5 email credits."
			>
				<button className="btn btn-outline-success payment_button">ADD CREDITS</button>
			</ReactStripeCheckout>
		</div>
		);
	}
}
const mapStateToProps = (state) => ({
	auth: state.auth
});
export default connect(mapStateToProps, { handleToken })(Payments);