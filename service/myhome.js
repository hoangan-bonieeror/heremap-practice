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
        zoom: 20,
        center: NhaTui
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
    at: '10.82397,106.68567'
}, (result) => {
    result.items.forEach((item) => {
        // Assumption: ui is instantiated
        // Create an InfoBubble at the returned location with
        // the address as its contents:
        ui.addBubble(new H.ui.InfoBubble(item.position, {
            content: "Nhà tui ở " + item.address.label 
        }));
    });
}, alert);


// service.geocode({
//     q: 'Hẻm 195 Nguyễn Thái Sơn 195/11, Quận Gò Vấp, Việt Nam'
//   }, (result) => {
//     // Add a marker for each location found
//     result.items.forEach((item) => {
//       map.addObject(new H.map.Marker(item.position));
//     });
//   }, alert);