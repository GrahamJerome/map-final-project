initMap = () => {
	let map;

	map = new google.maps.Map(document.getElementById('map'), {
	   zoom: 15,
	   center: {lat: 45.3544903, lng: -75.9245926}
	});
}
