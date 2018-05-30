import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import NavToggle from './NavToggle';
import LocationsList from './LocationsList';
import fsLogo from './images/foursquare-logo.jpg';
import './css/App.css';
import './css/responsive.css';

class App extends Component {
	state = {
		markers: [],
		locations: [
			{ title: "Freshii", position: { lat: 45.353835, lng: -75.931967 }, show: true },
			{ title: "Shawarma House", position: { lat: 45.3578524, lng: -75.9358577 }, show: true },
			{ title: "Willy's Pizza", position: { lat: 45.3541745, lng: -75.9354016 }, show: true },
			{ title: "Starbucks", position: { lat: 45.3582155, lng: -75.9368827 }, show: true },
			{ title: "McDonald's", position: { lat: 45.3587677, lng: -75.9386384 }, show: true }
		],
		foursquare: require('react-foursquare')({
		  clientID: '4UXJZBCVXFLJUVGLKEX1VQVMCEFJDKJKYYASDHJEHH0WOK4I',
		  clientSecret: 'BATMM0DKAH2ILJVRPXUWZ2WTSXLOU2V1V1S2P245AQ1DRBJI'
		})
	}

	componentDidMount() {
		const { locations, foursquare } = this.state;
		const pingFs = locations.map((location) => {
			foursquare.venues.getVenues({
				"ll": `${location.position.lat}, ${location.position.lng}`,
				"query": location.title
			}).then(res => {
					Object.assign(location, res.response.venues[0], { success: true });
			}).catch(err => {
				// this can easily be triggered by calling more than 950 times
				console.log(err);
			});
		});

		this.loadMap();
	}

	componentDidUpdate() {
		this.loadMap();
	}

	// setup and render the map
	loadMap() {
		if (!this.props || !this.props.google) return;

		/* initialize the map */

		const { google } = this.props;
		const { locations, markers } = this.state;
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
			// console.log(location);
			if (location.show) {
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
			}
		});

		// adjust map view to fit all markers
		this.map.fitBounds(bounds);
	}

	// render the marker info window
	populateInfoWindow = (marker) => {

		const { google } = this.props;

		// close nav if it's open
		this.closeNav();

    // check to make sure the mapInfoWindow is not already opened on this marker.
    if (this.mapInfoWindow.marker !== marker) {

    	this.resetMarkers();

    	// set marker, and toggle bounce animation
	    this.mapInfoWindow.marker = marker;
	    this.mapInfoWindow.marker.setAnimation(google.maps.Animation.BOUNCE);

	    // recenter map based on marker that's clicked
	    const latLng = marker.getPosition();
	    this.map.setCenter(latLng);

	    // populate the marker content
	    let markerContent;

	    /*
	    * This part renders the info window content in two ways:
	    *	1. if the foursquare API returned information we display it
	    * 2. if not, we display the basic preset information we used in
	    *	our query to foursquare in the first place.
	    */

	    if (marker.fSquareInfo.success) {
	    	// foursqaure API success
	    	markerContent =
	    	`<div class="infoWindow">` +
	    		`<h2><img src="${marker.fSquareInfo.categories[0].icon.prefix+'bg_32'+marker.fSquareInfo.categories[0].icon.suffix}" alt="restaurant category"> ${marker.fSquareInfo.name}</h2>` +
	    		`<h4>${marker.fSquareInfo.categories[0].name}, <strong>${marker.fSquareInfo.hereNow.summary}</strong></h4>` +
	    		`<p>checkins: <strong>${marker.fSquareInfo.stats.checkinsCount}</strong> tips: <strong>${marker.fSquareInfo.stats.tipCount}</strong> visits: <strong>${marker.fSquareInfo.stats.visitsCount}</strong></p>` +
	    		`<div class="address">` +
	    			`<p>${marker.fSquareInfo.location.formattedAddress[0]}</p>` +
	    			`<p>${marker.fSquareInfo.location.formattedAddress[1]}</p>` +
	    		`</div>` +
	    		`<img src=${fsLogo} alt="four square logo" />` +
	    	`</div>`;
	    } else {
	    	// foursqaure API failure
	    	markerContent =
	    	`<div class="infoWindow">` +
	    		`<h2>${marker.title}</h2>` +
	    		`<p>Foursquare API unavailable</p>` +
	    		`<img src=${fsLogo} alt="four square logo" />` +
	    	`</div>`;
	    }

	    // set the marker content, and open it
	    this.mapInfoWindow.setContent(markerContent);
	    this.mapInfoWindow.open(this.map, marker);

	    // make sure the marker property is cleared if the mapInfoWindow is closed.
	    this.mapInfoWindow.addListener('closeclick', () => {
	    	if (this.mapInfoWindow.marker) {
    			this.mapInfoWindow.marker.setAnimation(null);
    		  this.mapInfoWindow.marker = null;
	    	}
	    });
  	}
  }

  resetMarkers() {
  	const { markers } = this.state;

  	markers.forEach((marker) => {
  		marker.setAnimation(null);
  	});
  }

  // this must be an arrow function to make sure this is App.js scope
  locationLinkClicked = (location) => {
  	if (location.show) {
	  	const { markers } = this.state;
	  	const marker = markers.filter((marker) => marker.title === location.title);

	  	// return the object, not the array.
	  	this.populateInfoWindow(marker[0]);
  	}
  }

  // adjust the locations based on filtering
  filterLocations = (locations) => {
  	// markers MUST be reset upon every load, or else the array grows
  	this.setState({
  		locations: locations,
  		markers: []
  	});
  }

  closeNav() {
  	document.querySelector('.menu-icon-holder').classList.remove('clicked');
  	document.getElementById('locations').classList.remove('open');
  }

  toggleNav() {
  	document.querySelector('.menu-icon-holder').classList.toggle('clicked');
  	document.getElementById('locations').classList.toggle('open');
  }

  render() {
		return (
			<div id="app">
				<NavToggle
					toggleNav = {this.toggleNav}
				/>

				<LocationsList
					locations = {this.state.locations}
					locationLinkClicked = {this.locationLinkClicked}
					filterLocations = {this.filterLocations}
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