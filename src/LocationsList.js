import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp'
import LocationLink from './LocationLink';

class LocationsList extends Component {

	state = {
		query: "",
		locations: this.props.locations,
	}

	updateQuery = (query) => {
		const { locations } = this.state;
		let matchedList;

		// set the list to the new matched filter, or reset to the original
		if (query) {
			const match = new RegExp(escapeRegExp(query), 'i');
			matchedList = locations.map((location) => {
				location.show = match.test(location.title);
				return location;
			});

			this.setState({ query: query.trim() });

			this.props.filterLocations(matchedList);
		} else {
			this.setState({
				query: "",
				locations: locations.map((location) => {
					location.show = true;
					return location;
				})
			});

			this.props.filterLocations(this.props.locations);
		}
	}

	render() {
		const { locations, query } = this.state;

		return (
			<aside id="locations">
				<input
					type = "text"
					className = "filter"
					placeholder = "Filter ..."
					value = {query}
					onChange = {(event) => this.updateQuery(event.target.value)}
				/>

				<ul className="locations-holder">
				{
					locations.map((location, i) => {
						if (location.show) {
							return (
								<LocationLink
									key = {i}
									location = {location}
									locationLinkClicked = {this.props.locationLinkClicked}
								/>
							);
						}
					})
				}
				</ul>
			</aside>
		);
	}
}

export default LocationsList;