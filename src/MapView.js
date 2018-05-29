import React, { Component } from 'react';
import './css/App.css';

class MapView extends Component {

	state = {
		locations: this.props.locations,
		markers  : []
	}

	// componentDidMount() {
	// 	this.loadMap();
	// }

	// componentDidUpdate() {
	// 	this.loadMap();
	// }

	// loadMap() {
	// 	if (!this.props || !this.props.google) return;

	// 	/* initialize the map */

	// 	// const { google } = this.props;
	// 	const { locations, markers } = this.state;

	// 	const mapNode   = document.getElementById('map');
	// 	const mapConfig = Object.assign({}, {
	// 		zoom     : 13,
	// 		center   : { lat: 45.3544903, lng: -75.9245926 },
	// 		mapTypeId: 'roadmap'
	// 	});

	// 	this.map = new google.maps.Map(mapNode, mapConfig);
	// 	const bounds = new google.maps.LatLngBounds();
	// 	const mapInfoWindow = new google.maps.InfoWindow();

	// 	/* setup map markers */

	// 	locations.forEach((location, i) => {
	// 		// this automatically adds the marker to the map object
	// 		let marker = new google.maps.Marker({
	// 			map      : map,
	// 			position : location.position,
	// 			title    : location.title,
	// 			animation: google.maps.Animation.DROP,
	// 		  id: i
	// 		});

	// 		// create an onclick event to open an infowindow at each marker.
	// 		marker.addListener('click', () => {
	// 		  this.populateInfoWindow(marker, mapInfoWindow);
	// 		});

	// 		bounds.extend(location.position);

	// 		// push the marker to our array of markers.
	// 		markers.push(marker);
	// 	});

	// 	// adjust map view to fit all markers
	// 	map.fitBounds(bounds);
	// }

	// populateInfoWindow(marker, infowindow) {
 //    // check to make sure the infowindow is not already opened on this marker.
 //    if (infowindow.marker != marker) {
 //      infowindow.marker = marker;
 //      infowindow.setContent('<div>' + marker.title + '</div>');
 //      infowindow.open(this.map, marker);

 //      // make sure the marker property is cleared if the infowindow is closed.
 //      infowindow.addListener('closeclick', function(){
 //        infowindow.setMarker = null;
 //      });
 //    }
 //  }

	render() {
		return (
			<section id="map">
				Loading map...
			</section>
		);
	}
}

export default MapView;