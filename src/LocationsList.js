import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp'
import LocationLink from './LocationLink';


class LocationsList extends Component {

	state = {
		query: ""
	}

	updateQuery = (query) => {
		const { locations } = this.props;

		// set the list to the new matched filter, or reset to the original
		if (query) {
			const match = new RegExp(escapeRegExp(query), 'i');
			const matchedList = locations.map((location) => {
				location.show = match.test(location.title);
				return location;
			});

			this.setState({ query: query.trim() });
			this.props.filterLocations(matchedList);
		} else {
			const resetList = locations.map((location) => {
				location.show = true;
				return location;
			});

			this.setState({ query: "" });
			this.props.filterLocations(resetList);
		}
	}

	render() {
		const { query } = this.state;
		const { locations } = this.props;

		return (
			<aside id="locations">
				<h3>Restaurant List:</h3>
				<input
					type = "text"
					className = "filter"
					placeholder = "Filter ..."
					value = {query}
					onChange = {(event) => this.updateQuery(event.target.value)}
					aria-describedby="nav-filter-tip"
					role="search"
					tabIndex="2"
				/>
				<div role="tooltip" id="nav-filter-tip">Input text to filter the list results</div>

				<ul className="locations-holder">
				{
					locations.map((location, i) => {
						if (location.show) {
							return (
								<LocationLink
									key = {i}
									tabIndex = {i + 3}
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