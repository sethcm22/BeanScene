mapboxgl.accessToken = mbxToken;
const map = new mapboxgl.Map({
  container: "map", // container ID
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: "mapbox://styles/mapbox/streets-v11", // style URL
  center: [-98.7781, 38.5181], // starting position [lng, lat]
  zoom: 3, // starting zoom
});
