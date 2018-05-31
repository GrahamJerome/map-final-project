import React from 'react';

const LocationLink = (props) => (
	<li
		onClick = {() => props.locationLinkClicked(props.location)}
		tabIndex = {props.tabIndex}
	>
		{props.location.title}
	</li>
);

export default LocationLink;