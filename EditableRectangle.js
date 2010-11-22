function EditableRectangle(map, bounds) {

	this.set('map', map);	
	this.set('bounds', bounds);

	this.rect = new google.maps.Rectangle({
		strokeWeight: 1,
		strokeColor: '#ff0000',
		fillColor: '#ff0000'
	});
	this.rect.bindTo('map', this);
	this.rect.bindTo('bounds', this);

	this.handles = new RectangleHandles();
	this.handles.bindTo('map', this);
	this.handles.bindTo('ne', this);
	this.handles.bindTo('sw', this);
}

// not inheriting from google.maps.Rectangle to avoid property
// collisions as suggested: http://is.gd/hylPr
EditableRectangle.prototype = new google.maps.MVCObject;

EditableRectangle.prototype.enableDrawing = function() {
	var map = this.get('map');
	var me = this;
	google.maps.event.addListener(map, 'click', function(e) {
		me.set('bounds', new google.maps.LatLngBounds(e.latLng, e.latLng));
		me.handles.stickToMouse();
	});
}

EditableRectangle.prototype.ne_changed = function() { this.corners_changed_(); }
EditableRectangle.prototype.sw_changed = function() { this.corners_changed_(); }

EditableRectangle.prototype.bounds_changed = function() {
	var bounds = this.get('bounds');
	if (bounds) {
		google.maps.event.trigger(this, 'resizing', bounds);
		if (!this.changingCorners) {
			this.changingBounds = true;
				this.set('ne', bounds.getNorthEast());
				this.set('sw', bounds.getSouthWest());
			this.changingBounds = false;
		}
	}
}

EditableRectangle.prototype.corners_changed_ = function() {
	if (!this.changingBounds && this.get('map') && this.get('ne') && this.get('sw')) {
		var bounds = new google.maps.LatLngBounds();
		bounds.extend(this.get('ne'));
		bounds.extend(this.get('sw'));
		this.changingCorners = true;
			this.set('bounds', bounds);
		this.changingCorners = false;
	}
}
