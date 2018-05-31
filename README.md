# Neighbourhood Maps Local Eats

## Table of Contents
* [Introduction](#introduction)
* [Usage](#usage)
* [Instructions](#instructions)
* [Dependancies](#dependancies)
* [Contributing](#contributing)
* [Copyrights](#copyrights)

### Introduction
An app that allows the user to see restaurant locations available around an already determined area. The area and restaurants have been predetermined for testing purposes.

### Usage
Your browser will need to have javascript enabled.

To get started, clone the git repository found here:

`git clone https://github.com/GrahamJerome/map-final-project.git`

Once installed, run `npm install && npm start`

The server will automatically load the project in your default browser at `http://localhost:3000`

To run the production build, do the following:

1. `yarn build`
2. `yarn global add serve`
3. `serve -s build`

*NOTE:* There is an issue with the server and the service worker where it redirects index.html with a 301. This creates conflicts with caching index.html. To fix this, open `service-worker.js` and modify `/index.html` to `/`.

### Instructions
The index page will show a full screen map with markers. There are multiple ways to interact with the markers:

1. Click them directly to see information about the selected location
2. Click the black navigation icon top right, and select one of the locations from the list
3. Alternatively you may filter the list on the left by using the input field at the top of the menu. This will alter the layout of the map, markes, and list. To revert simply clear the search criteria.

The application will populate the restaurant locations with information from the Foursquare API. This will show how many people are currently there, previous checkins, tips, etc...

### Dependancies

The foursquare API was used for this project. For more information on how to use their API visit: `https://developer.foursquare.com/`.

Another dependancy worth noting is escape-string-regexp `https://www.npmjs.com/package/escape-string-regexp` used to sort the filtered results in the navigation menu.

### Contributing
You are free to fork and modify this project as you see fit.

### Copyrights
All the copyrights belong to Udacity.com
