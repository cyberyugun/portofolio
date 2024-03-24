const COUNTRY = 'Indonesia';
const OPACITY = 0.5; // Increase opacity for clearer arcs
const POINT_SIZE = 0.03; // Increase point size for clearer points

const elem = document.getElementById('globe-container');
const myGlobe = Globe()(elem)
  .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
  .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
  .pointOfView({ lat: -2.5, lng: 120.2, altitude: 3 }) // aim at Indonesia centroid
  .arcLabel(d => `${d.airline}: ${d.srcIata} &#8594; ${d.dstIata}`)
  .arcStartLat(d => +d.srcAirport.lat)
  .arcStartLng(d => +d.srcAirport.lng)
  .arcEndLat(d => +d.dstAirport.lat)
  .arcEndLng(d => +d.dstAirport.lng)
  .arcDashLength(0.25)
  .arcDashGap(1)
  .arcDashInitialGap(() => Math.random())
  .arcDashAnimateTime(4000)
  .arcColor(d => [`rgba(0, 255, 0, ${OPACITY})`, `rgba(255, 0, 0, ${OPACITY})`])
  .arcsTransitionDuration(0)
  .pointColor(() => 'orange')
  .pointAltitude(0)
  .pointRadius(POINT_SIZE) // Increase point size
  .pointsMerge(true);

// Load data
const airportParse = ([airportId, name, city, country, iata, icao, lat, lng, alt, timezone, dst, tz, type, source]) => ({ airportId, name, city, country, iata, icao, lat, lng, alt, timezone, dst, tz, type, source });
const routeParse = ([airline, airlineId, srcIata, srcAirportId, dstIata, dstAirportId, codeshare, stops, equipment]) => ({ airline, airlineId, srcIata, srcAirportId, dstIata, dstAirportId, codeshare, stops, equipment});

Promise.all([
  fetch('https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat').then(res => res.text())
    .then(d => d3.csvParseRows(d, airportParse)),
  fetch('https://raw.githubusercontent.com/jpatokal/openflights/master/data/routes.dat').then(res => res.text())
    .then(d => d3.csvParseRows(d, routeParse))
]).then(([airports, routes]) => {

  const byIata = indexBy(airports, 'iata', false);

  const filteredRoutes = routes
    .filter(d => byIata.hasOwnProperty(d.srcIata) && byIata.hasOwnProperty(d.dstIata)) // Exclude unknown airports
    .filter(d => d.stops === '0') // Non-stop flights only
    .map(d => Object.assign(d, {
      srcAirport: byIata[d.srcIata],
      dstAirport: byIata[d.dstIata]
    }))
    .filter(d => d.srcAirport.country === COUNTRY && d.dstAirport.country !== COUNTRY); // International routes from Indonesia

  myGlobe
    .pointsData(airports)
    .arcsData(filteredRoutes);
});

// Enable auto-rotation
myGlobe.controls().autoRotate = true;
myGlobe.controls().autoRotateSpeed = 0.3; // Adjust rotation speed

// Function to handle window resize
function handleResize() {
    // Update globe size and re-render
    myGlobe.width(window.innerWidth);
    myGlobe.height(window.innerHeight);
    myGlobe.renderer().setSize(window.innerWidth, window.innerHeight);
    myGlobe.camera().aspect = window.innerWidth / window.innerHeight;
    myGlobe.camera().updateProjectionMatrix();
}

// Listen for window resize event
window.addEventListener('resize', handleResize);
