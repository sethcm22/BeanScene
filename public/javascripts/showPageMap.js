mapboxgl.accessToken = mbxToken;

// const popup = new mapboxgl.Popup({
//   offset: popupOffsets,
//   className: "my-class",
// })
//   .setHTML("<h1>Hello World!</h1>")
//   .setMaxWidth("300px");

const map = new mapboxgl.Map({
  container: "map", // container ID
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: "mapbox://styles/mapbox/streets-v11", // style URL
  center: coffeeshop.geometry.coordinates, // starting position [lng, lat]
  zoom: 9, // starting zoom
});

// Set marker options.
const marker = new mapboxgl.Marker()
  .setLngLat(coffeeshop.geometry.coordinates)
  .addTo(map)
  .setPopup(
    new mapboxgl.Popup().setHTML(
      `<h3>${coffeeshop.name}</h1><p>${coffeeshop.location}</p>`
    )
  );
