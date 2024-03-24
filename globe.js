const colorScale = d3.scaleOrdinal(['orangered', 'mediumblue', 'darkgreen', 'yellow']);

const labelsTopOrientation = new Set(['Apollo 12', 'Luna 2', 'Luna 20', 'Luna 21', 'Luna 24', 'LCROSS Probe']); // avoid label collisions

const elem = document.getElementById('globe-container');
const moon = Globe()
  .globeImageUrl('./globe-assets/lunar_surface.jpg')
  .bumpImageUrl('./globe-assets/lunar_bumpmap.jpg')
  .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
  .showGraticules(true)
  .showAtmosphere(false) // moon has no atmosphere
  .labelText('label')
  .labelSize(1.7)
  .labelDotRadius(0.4)
  .labelDotOrientation(d => labelsTopOrientation.has(d.label) ? 'top' : 'bottom')
  .labelColor(d => colorScale(d.agency))
  .labelLabel(d => `
      <div><b>${d.label}</b></div>
      <div>${d.agency} - ${d.program} Program</div>
      <div>Landing on <i>${new Date(d.date).toLocaleDateString()}</i></div>
    `)
  .onLabelClick(d => window.open(d.url, '_blank'))
  .backgroundColor('#111827')
  (elem);

// Enable auto-rotation
moon.controls().autoRotate = true;
moon.controls().autoRotateSpeed = 0.3; // Adjust rotation speed

// Function to handle window resize
function handleResize() {
    // Update globe size and re-render
    moon.width(window.innerWidth);
    moon.height(window.innerHeight);
    moon.renderer().setSize(window.innerWidth, window.innerHeight);
    moon.camera().aspect = window.innerWidth / window.innerHeight;
    moon.camera().updateProjectionMatrix();
}

// Listen for window resize event
window.addEventListener('resize', handleResize);
