import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import NavToggle from './NavToggle';
import LocationsList from './LocationsList';
import MapView from './MapView';
import fsLogo from './images/foursquare-logo.jpg';
import './css/App.css';
import './css/responsive.css';

class App extends Component {
	state = {
		map: {},
		mapInfoWindow: {},
		markers: [],
		locations: [
			{ title: "Freshii", position: { lat: 45.353835, lng: -75.931967 }, show: true },
			{ title: "Shawarma House", position: { lat: 45.3578524, lng: -75.9358577 }, show: true },
			{ title: "Willy's Pizza", position: { lat: 45.3541745, lng: -75.9354016 }, show: true },
			{ title: "Starbucks", position: { lat: 45.3582155, lng: -75.9368827 }, show: true },
			{ title: "McDonald's", position: { lat: 45.3587677, lng: -75.9386384 }, show: true }
		]
	}

	componentDidMount() {
		const { locations } = this.state;
		const pingFs = locations.map((location) => {
			const querystring = require('querystring');
			const credentials = {
			  client_id: '4UXJZBCVXFLJUVGLKEX1VQVMCEFJDKJKYYASDHJEHH0WOK4I',
			  client_secret: 'BATMM0DKAH2ILJVRPXUWZ2WTSXLOU2V1V1S2P245AQ1DRBJI'
			}
			const version = 'v=20171001';
			const params = {
				"ll": `${location.position.lat}, ${location.position.lng}`,
				"query": location.title
			}
			const urlString = 'https://api.foursquare.com/v2/venues/search?' +
        querystring.stringify(params) + '&' + version + '&' +
        querystring.stringify(credentials);
			fetch(urlString)
				.then( response => response.json())
				.then( res => {
					Object.assign(location, res.response.venues[0], { success: true });
				})
				.catch( error => {
					console.log(error);
				});
			});

		this.initState();
	}

	initState() {
		if (!this.props || !this.props.google) return;

		const { google } = this.props;
		const mapNode = document.getElementById('map');
		const map = new google.maps.Map(mapNode, {
			center: { lat: 45.3544903, lng: -75.9245926 },
		});
		const mapInfoWindow = new google.maps.InfoWindow();

		this.setState({
			map: map,
			mapInfoWindow: mapInfoWindow
		});
	}

	/*
	* populateInfoWindow resides in App.js because both siblings can trigger it.
	* Having it inside MapView may sound cleaner, but it requires a bunch of
	* states to be set on each marker to verify their interactions. Why suffer?
	*/
	populateInfoWindow = (marker) => {
		const { google } = this.props;
		const { map, mapInfoWindow, markers } = this.state;

		// close nav if it's open
		this.closeNav();

		// console.log('markers: ', markers);
		// console.log('matched marker: ', marker);

    // check to make sure the mapInfoWindow is not already opened on this marker.
    if (mapInfoWindow.marker !== marker) {
			// reset marker animations
			markers.forEach((marker) => {
	  		marker.setAnimation(null);
	  	});

    	// set marker, and toggle bounce animation
	    mapInfoWindow.marker = marker;
	    mapInfoWindow.marker.setAnimation(google.maps.Animation.BOUNCE);

	    // recenter map based on marker that's clicked
	    const latLng = marker.getPosition();
	    map.setCenter(latLng);

	    /*
	    * This part renders the info window content in two ways:
	    *	1. if the foursquare API returned information we display it
	    * 2. if not, we display the basic preset information we used in
	    *	our query to foursquare in the first place.
	    */
	    let markerContent;
	    // set tab indexes for all content to increase accessibility
	    let tabIndex = 99;

	    if (marker.fSquareInfo.success) {
	    	// foursqaure API success
	    	markerContent =
	    	`<div class="infoWindow" id="miw" tabIndex=${++tabIndex}>` +
	    		`<h2 tabIndex=${++tabIndex}><img src="${marker.fSquareInfo.categories[0].icon.prefix+'bg_32'+marker.fSquareInfo.categories[0].icon.suffix}" alt="restaurant category"> ${marker.fSquareInfo.name}</h2>` +
	    		`<h4 tabIndex=${++tabIndex}>${marker.fSquareInfo.categories[0].name}, <strong>${marker.fSquareInfo.hereNow.summary}</strong></h4>` +
	    		`<p tabIndex=${++tabIndex}>checkins: <strong>${marker.fSquareInfo.stats.checkinsCount}</strong> tips: <strong>${marker.fSquareInfo.stats.tipCount}</strong> visits: <strong>${marker.fSquareInfo.stats.visitsCount}</strong></p>` +
	    		`<div class="address" tabIndex=${++tabIndex}>` +
	    			`<p>${marker.fSquareInfo.location.formattedAddress[0]}</p>` +
	    			`<p>${marker.fSquareInfo.location.formattedAddress[1]}</p>` +
	    		`</div>` +
	    		`<img src=${fsLogo} tabIndex=${++tabIndex} alt="four square logo" />` +
	    	`</div>`;
	    } else {
	    	// foursqaure API failure
	    	markerContent =
	    	`<div class="infoWindow" id="miw" tabIndex=${++tabIndex}>` +
	    		`<h2 tabIndex=${++tabIndex}>${marker.title}</h2>` +
	    		`<p tabIndex=${++tabIndex}>Foursquare API unavailable</p>` +
	    		`<img src=${fsLogo} tabIndex=${++tabIndex} alt="four square logo" />` +
	    	`</div>`;
	    }

	    // set the marker content, and open it
	    mapInfoWindow.setContent(markerContent);
	    mapInfoWindow.open(map, marker);

	    // set the focus to the current selected marker
	    google.maps.event.addListener(mapInfoWindow, 'domready', function() {
	      document.querySelector('#miw').focus();
	    });

	    // make sure the marker property is cleared if the mapInfoWindow is closed.
	    mapInfoWindow.addListener('closeclick', () => {
	    	if (mapInfoWindow.marker) {
    			mapInfoWindow.marker.setAnimation(null);
    		  mapInfoWindow.marker = null;
	    	}
	    });
  	}
  }

  // this must be an arrow function to make sure this is App.js scope
  locationLinkClicked = (location) => {
  	// console.log('location: ', location);
  	const { markers } = this.state;
  	const [ marker ] = markers.filter((marker) => marker.title === location.title);

  	this.populateInfoWindow(marker);
  }

  // adjust the locations based on filtering
  filterLocations = (locations) => {
  	this.state.markers.forEach((marker) => {
			marker.setMap(null);
		});

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

  	const locationsNav = document.getElementById('locations');
  	locationsNav.classList.toggle('open');
  	// set focus on nav now that it's open
  	locationsNav.focus();
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

				<MapView
					google = {this.props.google}
					map = {this.state.map}
					mapInfoWindow = {this.state.mapInfoWindow}
					markers = {this.state.markers}
					locations = {this.state.locations}
					populateInfoWindow = {this.populateInfoWindow}
				/>
		  </div>
		);
  }
}

// wrap the app in the GoogleAPI so child components can access it
export default GoogleApiWrapper({
	apiKey: 'AIzaSyAF0n-RhX9L8GW6VGO6T-wcPpzyOy3zHRg',
	libraries: ['visualization']
})(App);