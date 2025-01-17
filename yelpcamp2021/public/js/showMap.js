mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v9',
  center: campground.geometry.coordinates,
  zoom: 6
});

map.addControl(new mapboxgl.NavigationControl());

new mapboxgl.Marker()
.setLngLat(campground.geometry.coordinates)
.setPopup(
  new mapboxgl.Popup({offset: 15})
  .setHTML(
    `<h5>${campground.title}</h5><p>${campground.location}</p>`
  )
)
.addTo(map);
