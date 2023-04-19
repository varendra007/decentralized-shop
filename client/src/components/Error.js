import React, { Component } from 'react';
// import TopButton from "../../../components/topButton/TopButton";
import { Fade } from 'react-reveal';
import './Error.css';
import { Link } from 'react-router-dom';
const Error = () => {
	return (
		<div className="error-main">
			<div className="error-class">
				<Fade bottom duration={2000} distance="40px">
					<h1>Woops</h1>
					<h1 className="error-404">404</h1>
					<p>
						The requested page is unavailable at the moment! Please login to
						continue.
					</p>
					{/* <Link
						className="main-button"
						to="/signin"
						style={{
							// color: theme.body,
							// backgroundColor: theme.text,
							// border: `solid 1px ${theme.text}`,
							display: 'inline-flex',
						}}
					>
						Login
					</Link> */}
				</Fade>
			</div>
			{/* <TopButton theme={this.props.theme} /> */}
		</div>
	);
};

export default Error;
