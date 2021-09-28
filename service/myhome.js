var NhaTui = { lat: 10.82397, lng: 106.68567 }
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
        zoom: 20,
        center: nhaChuHuy
    });


var ui = H.ui.UI.createDefault(map, defaultLayers);

// Enable the event system on the map instance:
var mapEvents = new H.mapevents.MapEvents(map);

// Add event listeners:
map.addEventListener('tap', function (evt) {
    // Log 'tap' and 'mouse' events:
    console.log(evt.type, evt.currentPointer.type);
});

// Instantiate the default behavior, providing the mapEvents object:
var behavior = new H.mapevents.Behavior(mapEvents);

var service = platform.getSearchService();

// Call the geocode method with the geocoding parameters,
// the callback and an error callback function (called if a
// communication error occurs):
service.reverseGeocode({
    at: '47.50189,-122.23721'
}, (result) => {
    result.items.forEach((item) => {
        // Assumption: ui is instantiated
        // Create an InfoBubble at the returned location with
        // the address as its contents:
        ui.addBubble(new H.ui.InfoBubble(item.position, {
            content: "Nhà chú Huy ở " + item.address.label 
        }));
    });
}, alert);


// service.geocode({
//     q: '7621 S 113th St, Seattle, WA 98178, USA'
//   }, (result) => {
//     // Add a marker for each location found
//     result.items.forEach((item) => {
//         console.log(item.position)
//       map.addObject(new H.map.Marker(item.position));
//     });
//   }, alert);