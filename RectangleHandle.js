function RectangleHandle() {

	// sometimes we need to set only one axis (the other comes later with another event)
	var defaultPosition = new google.maps.LatLng(0, 0);

	this.set('position', defaultPosition);
	this.set('draggable', true);
	var icon = new google.maps.MarkerImage(
		'draggable.png',
		new google.maps.Size(11, 11),
		new google.maps.Point(0, 0),
		new google.maps.Point(6, 6)
	);
	this.set('icon', icon);
}

RectangleHandle.prototype = new google.maps.Marker;

RectangleHandle.prototype.position_changed = function() {
	var position = this.get('position');
	if (position) {
		this.setIfDifferent_('lat', position.lat());
		this.setIfDifferent_('lng', position.lng());
	}
}

RectangleHandle.prototype.lat_changed = function() {
	var lat = this.get('lat');
	var lng = this.get('lng');
	var position = this.get('position');
	if (lat != position.lat())
		this.set('position', new google.maps.LatLng(lat, lng));
}

RectangleHandle.prototype.lng_changed = function() {
	var lat = this.get('lat');
	var lng = this.get('lng');
	var position = this.get('position');
	if (lng != position.lng())
		this.set('position', new google.maps.LatLng(lat, lng));
}

RectangleHandle.prototype.setIfDifferent_ = function(key, value) {
	if (value != this.get(key))
		this.set(key, value);
}
