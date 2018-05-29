import React, { Component } from 'react';

const LocationLink = (props) => (
	<li
		onClick = {() => {
			props.locationLinkClicked(props.location);
		}}
	>
		{props.location.title}
	</li>
);

export default LocationLink;