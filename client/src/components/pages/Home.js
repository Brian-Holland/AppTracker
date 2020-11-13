import React from 'react';
import Applications from '../applications/Applications';

const Home = () => {
	return (
		<div className="grid-2">
			<div>{/*app form*/}</div>
			<div>
				<Applications />
			</div>
		</div>
	);
};

export default Home;
