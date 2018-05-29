import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';

import LocationsList from './LocationsList';
import './css/App.css';

class App extends Component {
	state = {
		markers: [],
		locations: [
			{ title: "Freshii", position: { lat: 45.353835, lng: -75.931967 } },
			{ title: "Shawarma House", position: { lat: 45.3578524, lng: -75.9358577 } },
			{ title: "Willy's Pizza", position: { lat: 45.3541745, lng: -75.9354016 } },
			{ title: "Starbucks", position: { lat: 45.3582155, lng: -75.9368827 } },
			{ title: "McDonald's", position: { lat: 45.3587677, lng: -75.9386384 } }
		],
		foursquare: require('react-foursquare')({
		  clientID: '4UXJZBCVXFLJUVGLKEX1VQVMCEFJDKJKYYASDHJEHH0WOK4I',
		  clientSecret: 'BATMM0DKAH2ILJVRPXUWZ2WTSXLOU2V1V1S2P245AQ1DRBJI'
		}),
		fsItems: []
	}

	componentDidMount() {
		const { locations, foursquare, fsItems } = this.state;
		const fsParams = locations.map((location) => {
			foursquare.venues.getVenues({
				"ll": `${location.position.lat}, ${location.position.lng}`,
				"query": location.title
			}).then(res => {
					Object.assign(location, res.response.venues[0]);
			});
		});

		this.loadMap();
	}

	componentDidUpdate() {
		this.loadMap();
	}

	loadMap() {
		if (!this.props || !this.props.google) return;

		/* initialize the map */

		const { google } = this.props;
		const { locations, markers, fsItems } = this.state;
		const mapNode   = document.getElementById('map');
		const mapConfig = Object.assign({}, {
			zoom     : 13,
			center   : { lat: 45.3544903, lng: -75.9245926 },
			mapTypeId: 'roadmap'
		});
		const bounds = new google.maps.LatLngBounds();

		this.map = new google.maps.Map(mapNode, mapConfig);
		this.mapInfoWindow = new google.maps.InfoWindow();

		/* setup map markers */

		locations.forEach((location, i) => {
			// this automatically adds the marker to the map object
			let marker = new google.maps.Marker({
				map      : this.map,
				position : location.position,
				title    : location.title,
				animation: google.maps.Animation.DROP,
			  id: i,
			  fSquareInfo: location
			});

			// create an onclick event to open an infowindow at each marker.
			marker.addListener('click', () => {
			  this.populateInfoWindow(marker);
			});

			bounds.extend(location.position);

			// push the marker to our array of markers.
			markers.push(marker);
		});

		// adjust map view to fit all markers
		this.map.fitBounds(bounds);
	}

	populateInfoWindow(marker) {
    // check to make sure the mapInfoWindow is not already opened on this marker.
    if (this.mapInfoWindow.marker !== marker) {
	    this.mapInfoWindow.marker = marker;

	    // populate the marker content
	    this.mapInfoWindow.setContent(
	    	`<div className="marker">` +
	    		`<h2><img src="${marker.fSquareInfo.categories[0].icon.prefix+'bg_32'+marker.fSquareInfo.categories[0].icon.suffix}"> ${marker.fSquareInfo.name}</h2>` +
	    		`<h4>${marker.fSquareInfo.categories[0].name}, <u>${marker.fSquareInfo.hereNow.summary}</u></h4>` +
	    		`<p>checkins: <strong>${marker.fSquareInfo.stats.checkinsCount}</strong> tips: <strong>${marker.fSquareInfo.stats.tipCount}</strong> visits: <strong>${marker.fSquareInfo.stats.visitsCount}</strong></p>` +
	    		`<div className="address">` +
	    			`<p>${marker.fSquareInfo.location.formattedAddress[0]}</p>` +
	    			`<p>${marker.fSquareInfo.location.formattedAddress[1]}</p>` +
	    		`</div>` +
	    	`</div>`
	    );
	    this.mapInfoWindow.open(this.map, marker);

	    // make sure the marker property is cleared if the mapInfoWindow is closed.
	    this.mapInfoWindow.addListener('closeclick', () => {
	      this.mapInfoWindow.setMarker = null;
	    });
  	}
  }

  // this must be an arrow function to make sure this is App.js scope
  locationLinkClicked = (location) => {
  	const { markers } = this.state;
  	const marker = markers.filter((marker) => marker.title === location.title);

  	// return the object, not the array.
  	this.populateInfoWindow(marker[0]);
  }

  render() {
		return (
			<div id="app">
				<LocationsList
					locations = {this.state.locations}
					locationLinkClicked = {this.locationLinkClicked}
				/>
				<section id="map">
					Loading map...
				</section>
		  </div>
		);
  }
}

// wrap the app in the GoogleAPI so child components can access it
export default GoogleApiWrapper({
	apiKey: 'AIzaSyAF0n-RhX9L8GW6VGO6T-wcPpzyOy3zHRg',
	libraries: ['visualization']
})(App);
