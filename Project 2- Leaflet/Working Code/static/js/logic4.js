// Create the tile layer that will be the background of our map
let lightmap = L.tileLayer("http://www.mapquestapi.com/traffic/v2/incidents?key={accessToken}&boundingBox=39.95,-105.25,39.52,-104.71&filters=construction,incidents", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: "uJxxQOCV7ORltQMW9y7gLqVLtGOazhpS"
});
// Initialize all of the LayerGroups we'll be using
let layers = {
    INCIDENT: new L.LayerGroup(),
    CONSTRUCTION: new L.LayerGroup(),
    CONGESTION: new L.LayerGroup()
};
// Create the map with our layers
let map = L.map("map-id", {
    center: [40.73, -74.0059],
    zoom: 12,
    layers: [
        layers.INCIDENT,
        layers.CONSTRUCTION,
        layers.CONGESTION
    ]
});
// Add our 'lightmap' tile layer to the map
lightmap.addTo(map);
// Create an overlays object to add to the layer control
let overlays = {
    "Accidents": layers.INCIDENT,
    "Road Work": layers.CONSTRUCTION,
    "Traffic Congestion": layers.CONGESTION
};
// Create a control for our layers, add our overlay layers to it
L.control.layers(null, overlays).addTo(map);
// Create a legend to display information about our map
let info = L.control({
    position: "bottomright"
});
// When the layer control is added, insert a div with the class of "legend"
info.onAdd = function () {
    let div = L.DomUtil.create("div", "legend");
    return div;
};
// Add the info legend to the map
info.addTo(map);
// Initialize an object containing icons for each layer group
let icons = {
    INCIDENT: L.ExtraMarkers.icon({
        icon: "ion-settings",
        iconColor: "white",
        markerColor: "yellow",
        shape: "star"
    }),
    CONSTRUCTION: L.ExtraMarkers.icon({
        icon: "ion-android-bicycle",
        iconColor: "white",
        markerColor: "red",
        shape: "circle"
    }),
    CONGESTION: L.ExtraMarkers.icon({
        icon: "ion-android-bicycle",
        iconColor: "white",
        markerColor: "orange",
        shape: "circle"
    })
};
// Perform an API call to the endpoint
// d3.json("https://www.mapquestapi.com/traffic/v2/incidents?&outFormat=json&boundingBox=37.61287160787662%2C-77.310791015625%2C37.46859105963785%2C-77.55695343017578&key=KEY", function(infoRes) {
// When the first API call is complete, perform another call to the Citi Bike Station Status endpoint

//   d3.json("https://www.mapquestapi.com/traffic/v2/incidents?&outFormat=json&boundingBox=37.61287160787662%2C-77.310791015625%2C37.46859105963785%2C-77.55695343017578&key=uJxxQOCV7ORltQMW9y7gLqVLtGOazhpS", callback);

d3.json("https://www.mapquestapi.com/traffic/v2/incidents?&outFormat=json&boundingBox=37.61287160787662%2C-77.310791015625%2C37.46859105963785%2C-77.55695343017578&key=uJxxQOCV7ORltQMW9y7gLqVLtGOazhpS", function (mapquest) {
    // console.log("mapquest:");
    console.log(mapquest);
    let type = mapquest.incidents.type;
    console.log(type);
    mapquest.incidents.type;
    console.log("incident type:" + mapquest.incidents.type);
});
//     // Create an object to keep of the number of markers in each layer
//     let trafficCount = {
//         INCIDENT: 0,
//         CONSTRUCTION: 0,
//         CONGESTION: 0
//     };
//     // Initialize a trafficStatusCode, which will be used as a key to access the appropriate layers, icons, and station count for layer group
//     let trafficStatusCode;
//     // Loop through the stations (they're the same size and have partially matching data)
//     for (let i = 0; i < type; i++) {
//         // Create a new station object with properties of both station objects
//         let station = Object.assign({}, trafficInfo[i], trafficStatus[i]);
//         // If a station is listed but not installed, it's coming soon
//         if (!traffic.is_installed) {
//             trafficStatusCode = "INCIDENT";
//         }
//         // If a station has no bikes available, it's empty
//         else if (!traffic.num_bikes_available) {
//             trafficStatusCode = "CONSTRUCTION";
//         }
//         // If a station has less than 5 bikes, it's status is low
//         else {
//             trafficStatusCode = "CONGESTION";
//         }
//         // Update the station count
//         trafficCount[trafficStatusCode]++;
//         // Create a new marker with the appropriate icon and coordinates
//         let newMarker = L.marker([traffic.lat, traffic.lon], {
//             icon: icons[trafficStatusCode]
//         });
//         // Add the new marker to the appropriate layer
//         newMarker.addTo(layers[trafficStatusCode]);
//         // Bind a popup to the marker that will  display on click. This will be rendered as HTML
//         newMarker.bindPopup(traffic.name + "<br> Capacity: " + traffic.capacity + "<br>" + station.num_bikes_available + " Bikes Available");
//     }
//     // Call the updateLegend function, which will... update the legend!
//     updateLegend(updatedAt, trafficCount);
// });

// // Update the legend's innerHTML with the last updated time and station count
// function updateLegend(time, trafficCount) {
//     document.querySelector(".legend").innerHTML = [
//         "<p>Updated: " + moment.unix(time).format("h:mm:ss A") + "</p>",
//         "<p class='incidents'>Accidents: " + trafficCount.INCIDENT + "</p>",
//         "<p class='construction'>Road Word: " + trafficCount.CONSTRUCTION + "</p>",
//         "<p class='congestion'>Traffic Congestion: " + trafficCount.CONGESTION + "</p>"
//     ].join("");
// }