import React, { Component } from 'react';
import './css/App.css';

class MapView extends Component {
	initMap = () => {
		let map;

		map = new google.maps.Map(document.getElementById('map'), {
		   zoom: 13,
		   center: {lat: 40.7413549, lng: -73.9980244}
		});
	}

	render() {
		return (
			<section id="map"></section>
		);
	}
}

export default MapView;