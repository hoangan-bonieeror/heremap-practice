var NhaTui = { lat: 10.82397, lng: 106.68567 }
var platform = new H.service.Platform({
    'apikey': '0sZtG3y_uHyaTrbiuBIlVp49yk3-8nv0OA4XNKqMmGs'
});

// Obtain the default map types from the platform object:
var defaultLayers = platform.createDefaultLayers();

// Instantiate (and display) a map object:
var map = new H.Map(
    document.getElementById('mapContainer'),
    defaultLayers.vector.normal.map,
    {
        zoom: 12,
        center: NhaTui
    });


var ui = H.ui.UI.createDefault(map, defaultLayers);
// Enable the event system on the map instance:
var mapEvents = new H.mapevents.MapEvents(map);

// Add event listeners:
map.addEventListener('tap', function(evt) {
    // Log 'tap' and 'mouse' events:
    console.log(evt.type, evt.currentPointer.type);
});

// Instantiate the default behavior, providing the mapEvents object:
var behavior = new H.mapevents.Behavior(mapEvents);

var routingParams = {
    'mode': 'shortest;pedestrian;',
    'start': 'geo!10.82397,106.68567',
    'range': '200',
    'rangetype' : 'distance'
};

// Define a callback function to process the isoline response.
var onResult = function (result) {
    var center = new H.geo.Point(
        result.response.center.latitude,
        result.response.center.longitude),
        isolineCoords = result.response.isoline[0].component[0].shape,
        linestring = new H.geo.LineString(),
        isolinePolygon,
        isolineCenter;

    // Add the returned isoline coordinates to a linestring:
    isolineCoords.forEach(function (coords) {
        linestring.pushLatLngAlt.apply(linestring, coords.split(','));
    });

    // Create a polygon and a marker representing the isoline:
    isolinePolygon = new H.map.Polygon(linestring);
    isolineCenter = new H.map.Marker(center);

    // Add the polygon and marker to the map:
    map.addObjects([isolineCenter, isolinePolygon]);

    // Center and zoom the map so that the whole isoline polygon is
    // in the viewport:
    map.getViewModel().setLookAtData({ bounds: isolinePolygon.getBoundingBox() });
};

// Get an instance of the routing service:
var router = platform.getRoutingService();

// Call the Routing API to calculate an isoline:
router.calculateIsoline(
    routingParams,
    onResult,
    function (error) {
        alert(error.message);
    }
);