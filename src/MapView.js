import React, { Component } from 'react';
import './css/App.css';

class MapView extends Component {

	state = {
		locations: this.props.locations,
		markers  : []
	}

	render() {
		return (
			<section id="map">
				Loading map...
			</section>
		);
	}
}

export default MapView;