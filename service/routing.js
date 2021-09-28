var HoChiMinh = { lat: 10.77642, lng: 106.70111 }
var Berlin = { lat: 52.53086, lng: 13.38474 }
var GoVap = { lat: 10.83379, lng: 106.66547 }
var NhaTui = { lat: 10.82397, lng: 106.68567 }
var starbuck = {lat : 47.49719, lng : -122.19973}
var nhaChuHuy = {lat: 47.50189, lng: -122.23721}
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
    zoom: 10,
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

var routingParameters = {
  routingMode: 'fast',
  transportMode: 'pedestrian',
  // The start point of the route:
  origin: '47.50189,-122.23721',
  // The end point of the route:
  destination: '47.49719,-122.19973',
  // Include the route shape in the response
  return: 'polyline'
};

// Define a callback function to process the routing response:
var onResult = function (result) {
  // ensure that at least one route was found
  if (result.routes.length) {
    console.log(result.routes[0])
    result.routes[0].sections.forEach((section) => {
      // Create a linestring to use as a point source for the route line
      let linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);

      // // Create a polyline to display the route:
      // let routeLine = new H.map.Polyline(linestring, {
      //   style: { strokeColor: 'black', lineWidth: 5 }
      // });

      // Create an outline for the route polyline:
      var routeOutline = new H.map.Polyline(linestring, {
        style: {
          lineWidth: 10,
          strokeColor: 'rgba(0, 128, 255, 0.7)',
          lineTailCap: 'arrow-tail',
          lineHeadCap: 'arrow-head'
        }
      });
      // Create a patterned polyline:
      var routeArrows = new H.map.Polyline(linestring, {
        style: {
          lineWidth: 10,
          fillColor: 'white',
          strokeColor: 'rgba(255, 255, 255, 1)',
          lineDash: [0, 2],
          lineTailCap: 'arrow-tail',
          lineHeadCap: 'arrow-head'
        }
      }
      );
      // create a group that represents the route line and contains
      // outline and the pattern
      var routeLine = new H.map.Group();
      routeLine.addObjects([routeOutline, routeArrows]);

      // Create a marker for the start point:
      let startMarker = new H.map.Marker(section.departure.place.location);
      
      // Create a marker for the end point:
      let endMarker = new H.map.Marker(section.arrival.place.location);

      // Add the route polyline and the two markers to the map:
      map.addObjects([routeLine, startMarker, endMarker]);

      // Set the map's viewport to make the whole route visible:
      map.getViewModel().setLookAtData({ bounds: routeLine.getBoundingBox() });
      map.addLayer(defaultLayers.vector.normal.traffic);
    });
  }
};


// Get an instance of the routing service version 8:
var router = platform.getRoutingService(null, 8);

// Call calculateRoute() with the routing parameters,
// the callback and an error callback function (called if a
// communication error occurs):
router.calculateRoute(routingParameters, onResult,
  function (error) {
    alert(error.message);
  });

