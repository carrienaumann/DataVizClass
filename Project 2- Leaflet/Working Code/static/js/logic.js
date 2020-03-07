var mapLayer = MQ.mapLayer(),
  map;

  // initialize the map
map = L.map('map', {
  layers: mapLayer,
  center: [ 37.541290, -77.434769 ],
  zoom: 11
});

L.control.layers({
  'Map': mapLayer,
  'Satellite': MQ.satelliteLayer(),
  'Dark': MQ.darkLayer(),
  'Light': MQ.lightLayer()
}, {
  'Traffic Flow': MQ.trafficLayer({layers: ['flow']}),
  'Traffic Incidents': MQ.trafficLayer({layers: ['incidents']})
}).addTo(map);

  // load GeoJSON from an external file
  $.getJSON("data/landmarks.geojson",function(data){
    var siteicon = L.icon({
        iconUrl: 'binoculars.png',
        iconSize: [20,15]
      }); 
      L.geoJson(data,{
        pointToLayer: function(feature,latlng){
          var marker = L.marker(latlng,{icon: siteicon});
        marker.bindPopup(feature.properties.Name + '<br/>' + feature.properties.Structure);
        return marker;
        }
      }  ).addTo(map);
    });