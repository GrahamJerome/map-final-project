import React, { Component } from 'react';
import './css/App.css';

const LocationLinks = (props) => (
	<ul className="locations-holder">
	{
		props.locations.map((location, i) => (
			<li key={i}>
				{/* you'll need to pass in the lat long here, so it'll need to be a component */}
				<a href="#">
					{location.title}
				</a>
			</li>
		))
	}
	</ul>
)

export default LocationLinks;