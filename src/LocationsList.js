import React, { Component } from 'react';
import LocationLink from './LocationLink';

class LocationsList extends Component {

	state = {
		query: "",
		locations: this.props.locations
	}

	updateQuery = (query) => {
		// update the state query to the entered query value
		this.setState({query});
	}

	render() {
		const { locations } = this.state;

		return (
			<aside id="locations">
				<input
					type = "text"
					className = "filter"
					placeholder = "Filter ..."
					value = {this.state.query}
					onChange = {(event) => this.updateQuery(event.target.value)}
				/>

				<ul className="locations-holder">
				{
					locations.map((location, i) => (
						<LocationLink
							key = {i}
							location = {location}
							locationLinkClicked = {this.props.locationLinkClicked}
						/>
					))
				}
				</ul>
			</aside>
		);
	}
}

export default LocationsList;