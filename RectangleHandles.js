function RectangleHandles() {

	this.set('map', null);
	this.set('ne', null);
	this.set('sw', null);

	this.a = new RectangleHandle();
	this.b = new RectangleHandle();
	this.c = new RectangleHandle();
	this.d = new RectangleHandle();

	this.a.bindTo('map', this);
	this.b.bindTo('map', this);
	this.c.bindTo('map', this);
	this.d.bindTo('map', this);
	
	this.a.bindTo('lat', this.b, 'lat');
	this.b.bindTo('lng', this.c, 'lng');
	this.c.bindTo('lat', this.d, 'lat');
	this.d.bindTo('lng', this.a, 'lng');

	this.a.bindTo('position', this, 'ne');
	this.c.bindTo('position', this, 'sw');
}

RectangleHandles.prototype = new google.maps.MVCObject;

RectangleHandles.prototype.stickToMouse = function() {
	var me = this;
	var eMove = google.maps.event.addListener(this.get('map'), 'mousemove', function(e) {
		me.c.set('position', e.latLng);
		var eClick = google.maps.event.addListener(me.c, 'click', function(e) {
			eMove.remove();
			eClick.remove();
		});
	});
}
