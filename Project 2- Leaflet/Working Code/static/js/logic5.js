// Store API link
var link = "https://www.mapquestapi.com/traffic/v2/incidents?&outFormat=json&boundingBox=37.61287160787662%2C-77.310791015625%2C37.46859105963785%2C-77.55695343017578&key=uJxxQOCV7ORltQMW9y7gLqVLtGOazhpS"

// Perform a GET request to the query URL
d3.json(link, function(data) {
    console.log(data);
    
    
    // Once we get a response, send the data.features object to the createFeatures function
    createFeatures(data.incidents);
  });
  
  function createFeatures(mapquestData) {
    
    // var loopinfo = d3.selectALL("mdata");
    
 
    var incidents = L.geoJSON(mapquestData, {
    // Define a function we want to run once for each feature in the features array
    // Give each feature a popup describing the place and time of the incident
   onEachFeature : function (incidents, layer) {
  
      layer.bindPopup("<h3>" + incidents.type +
        "</h3><hr><p>" + new Date(incidents.startTime) + "</p>" + "<p> Incident Info: " +  incidents.shortDesc + "</p>")
      },     pointToLayer: function (incidents, latlng) {
        return new L.circle(latlng,
          {radius: markerSize(incidents.type),
          fillColor: markerColor(incidents.type),
          fillOpacity: 1,
          stroke: false,
      })
    }
    });

    // Sending our types layer to the createMap function
  createMap(incidents);
}

function createMap(incidents) {

  // Define satelitemap and darkmap layers
  var satelitemap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.satellite",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
  });

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Satelite Map": satelitemap,
    "Dark Map": darkmap
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Incidents: incidents
  };

  // Create our map, giving it the satelitemap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [40.73, -74.0059],
    zoom: 3,
    layers: [satelitemap, incidents]
  });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

  var legend = L.control({position: 'bottomright'});

  legend.onAdd = function () {
  
      var div = L.DomUtil.create('div', 'info legend'),
          events = [1, 2, 3];
  
      for (var i = 0; i < incidents.length; i++) {
          div.innerHTML +=
              '<i style="background:' + markerColor(events[i] + 1) + '"></i> ' + 
      + events[i] + (events[i + 1] ? ' - ' + events[i + 1] + '<br>' : ' + ');
      }
  
      return div;
  };
  
  legend.addTo(myMap);

}