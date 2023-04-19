import React, { useEffect } from 'react';

const Logout = () => {
	useEffect(() => {
		localStorage.removeItem('email');
		localStorage.removeItem('add');
		localStorage.removeItem('token');
	});
	return (
		<div>
			<h1>You have been logeed out Successfully!</h1>
		</div>
	);
};

export default Logout;
