import React, { Component } from 'react';
import "./surveys-new.css";


export default ({ input, label, meta: { error, touched } }) => {
	return (
		<div className="container">
			<div className="row">
				<div className="col-md-6">
					<label className="label_form"> {label} </label>
				</div>
				<div className="col-md-6">
					<h4 className="meta">{touched && error}</h4>
				</div>
			</div>
			<div className="row">
				<div className="col-md-12">
					<input type="text" className="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm" {...input} />
					
				</div>
			</div>

		</div>
	);
}