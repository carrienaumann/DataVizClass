window.onload = function() {
    L.mapquest.key = 'JxxQOCV7ORltQMW9y7gLqVLtGOazhp';
    var map = L.mapquest.map('map', {
        center: [37.5407, -77.4360],
        zoom: 10,
        layers: L.mapquest.tileLayer('map'),
      });
    L.marker([37.541290, -77.434769], {
        icon: L.mapquest.icons.marker(),
        draggable: true
      }).bindPopup('Richmond, VA').addTo(map);
  
      L.circle([37.541290, -77.434769], { radius: 20000 }).addTo(map);

    };