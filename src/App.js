import React, { Component } from 'react';
import LocationsList from './LocationsList';
import MapView from './MapView';
import './css/App.css';

class App extends Component {
  render() {
		return (
			<div id="app">
				<LocationsList />
				<MapView />
		  </div>
		);
  }
}

export default App;
