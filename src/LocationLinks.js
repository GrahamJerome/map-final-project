import React, { Component } from 'react';
import './css/App.css';

const LocationLinks = (props) => (
	<div className="locations-holder">
		<ul>
		{
			props.locations.map((location, i) => (
				<li key={i}>{location.title}</li>
			))
		}
		</ul>
	</div>
)

export default LocationLinks;