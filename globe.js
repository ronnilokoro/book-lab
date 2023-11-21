
  import createGlobe from 'https://cdn.skypack.dev/cobe';

  let canvas = document.getElementById("cobe");
  let isDragging = false;
  let lastPhi = 0;
  let lastX = 0;
  let targetRotationSpeed = 0.002; // Speed for auto-rotation
  let currentRotationSpeed = 0; // Start with no rotation
  let dragRotationSpeed = 0; // Rotation speed while dragging
  let autoRotateDampingFactor = 0.04; // Damping for auto-rotation
  let dragDampingFactor = 0.05; // Damping for drag rotation

  const lerp = (start, end, factor) => start + (end - start) * factor;

  const globe = createGlobe(canvas, {
    devicePixelRatio: 2,
    width: 1200,
    height: 1200,
    phi: 0,
    theta: 0,
    dark: 1,
    diffuse: 1.6,
    mapSamples: 10000,
    mapBrightness: 3,
    baseColor: [0.3294, 0.3412, 0.3882],
    markerColor: [0.5686, 0.8627, 0.9882],
    glowColor: [0.0549, 0.0588, 0.0667],
    scale: 1.2,
    offset: [0, 0],
    markers: [
      { location: [36.7783, -119.4179], size: 0.03 },
			{ location: [31.9686, -99.9018], size: 0.03 },
			{ location: [27.6648, -81.5158], size: 0.03 },
			{ location: [40.7128, -74.006], size: 0.03 },
			{ location: [41.2033, -77.1945], size: 0.03 },
			{ location: [47.7511, -120.7401], size: 0.03 },
			{ location: [35.5175, -86.5804], size: 0.03 },
			{ location: [42.4072, -71.3824], size: 0.03 },
			{ location: [43.7844, -88.7879], size: 0.03 },
			{ location: [23.6345, -102.5528], size: 0.03 },
      { location: [36.0549, -113.2426], size: 0.03 },
			{ location: [-14.235, -51.9253], size: 0.03 },
			{ location: [53.55, 2.4333], size: 0.03 },
			{ location: [46.6031, 1.8883], size: 0.03 },
			{ location: [41.8719, 12.5674], size: 0.03 },
			{ location: [40.4637, 3.7492], size: 0.03 },
			{ location: [46.8182, 8.2275], size: 0.03 },
			{ location: [60.1282, 18.6435], size: 0.03 },
			{ location: [51.9194, 19.1451], size: 0.03 },
			{ location: [47.5162, 14.5501], size: 0.03 },
      { location: [60.472, 8.4689], size: 0.03 },
			{ location: [51.9194, 19.1451], size: 0.03 },
			{ location: [61.524, 105.3188], size: 0.03 },
			{ location: [47.1625, 19.5033], size: 0.03 },
			{ location: [45.9432, 24.9668], size: 0.03 },
			{ location: [35.8617, 104.1954], size: 0.03 },
			{ location: [20.5937, 78.9629], size: 0.03 },
			{ location: [36.2048, 138.25298], size: 0.03 },
			{ location: [23.8859, 45.0792], size: 0.03 },
			{ location: [38.9637, 35.2433], size: 0.03 },
      { location: [9.082, 8.6753], size: 0.03 },
			{ location: [30.5595, 22.9375], size: 0.03 },
			{ location: [-30.5595, 22.9375], size: 0.03 },
			{ location: [1.2921, 36.8219], size: 0.03 },
			{ location: [31.7917, 7.0926], size: 0.03 },
			{ location: [12.4628, 130.8411], size: 0.03 },
			{ location: [27.4698, 153.0251], size: 0.03 },
    ],
    onRender: (state) => {
      if (isDragging) {
        currentRotationSpeed = lerp(currentRotationSpeed, dragRotationSpeed, dragDampingFactor);
      } else {
        currentRotationSpeed = lerp(currentRotationSpeed, targetRotationSpeed, autoRotateDampingFactor);
      }
      lastPhi += currentRotationSpeed;
      state.phi = lastPhi;
    },
  });

  canvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    lastX = e.clientX;
    canvas.style.cursor = 'grabbing';
  });

  canvas.addEventListener('mouseup', () => {
    isDragging = false;
    dragRotationSpeed = currentRotationSpeed; // Retain the rotation speed at the moment of release
    canvas.style.cursor = 'grab';
  });

  canvas.addEventListener('mouseleave', () => {
    isDragging = false;
    dragRotationSpeed = currentRotationSpeed; // Retain the rotation speed at the moment of mouse leave
    canvas.style.cursor = 'grab';
  });

  canvas.addEventListener('mousemove', (e) => {
    if (isDragging) {
      const deltaX = e.clientX - lastX;
      lastX = e.clientX;
      dragRotationSpeed = deltaX * 0.01; // Drag sensitivity
    }
  });
  
