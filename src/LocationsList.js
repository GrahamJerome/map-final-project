import React, { Component } from 'react';
import LocationLinks from './LocationLinks';
import './css/App.css';

class LocationsList extends Component {

	state = {
		query: "",
		locations: [
			{title: "Freshii", location: {lat: 45.3539349, lng: -75.9341215}},
			{title: "Shawarma House", location: {lat: 45.3578524, lng: -75.9358577}},
			{title: "Willy's Pizza", location: {lat: 45.3541745, lng: -75.9354016}},
			{title: "Starbucks", location: {lat: 45.3582155, lng: -75.9368827}},
			{title: "McDonald's", location: {lat: 45.3587677, lng: -75.9386384}}
		]
	}

	updateQuery = (query) => {
		// update the state query to the entered query value
		this.setState({query});
	}

	render() {
		const {locations} = this.state;

		return (
			<aside id="locations">
				<input
					type="text"
					className="filter"
					placeholder="Filter ..."
					value={this.state.query}
					onChange={(event) => this.updateQuery(event.target.value)}
				/>

				<LocationLinks
					locations={locations}
				/>
			</aside>
		);
	}
}

export default LocationsList;