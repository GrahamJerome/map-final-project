import React, { Component } from 'react';

class MapView extends Component {

	componentDidUpdate() {
		this.updateMarkers();
		this.updateMap();
	}

	updateMarkers() {
		const { google, map, locations, markers } = this.props;

		locations.forEach((location, i) => {
			// this automatically adds the marker to the map object
			if (location.show) {
				let marker = new google.maps.Marker({
					map: map,
					position: location.position,
					title: location.title,
					animation: google.maps.Animation.DROP,
				  id: i,
				  fSquareInfo: location // modify this
				});

				// create an onclick event to open an infowindow at each marker.
				marker.addListener('click', () => {
				  this.props.populateInfoWindow(marker);
				});

				// push the marker to our array of markers.
				markers.push(marker);
			}
		});
	}

	updateMap() {
		const { google, map, locations } = this.props;

		// redraw the bounds
		const bounds = new google.maps.LatLngBounds();

		locations.forEach((location) => {
			if (location.show) {
				bounds.extend(location.position);
			}
		});

		map.fitBounds(bounds);
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