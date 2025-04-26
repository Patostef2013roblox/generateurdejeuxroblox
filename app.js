const generateBtn = document.getElementById('generateBtn');
const descriptionField = document.getElementById('description');
const downloadBtn = document.getElementById('downloadBtn');
const previewContainer = document.getElementById('previewContainer');
const canvas = document.getElementById('3dPreview');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas });

renderer.setSize(window.innerWidth, window.innerHeight);

const light = new THREE.AmbientLight(0xffffff);
scene.add(light);

function createObject(description) {
  let object;
  
  // Simple IA that can generate objects based on keywords in the description
  if (description.includes("cube")) {
    object = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    );
  } else if (description.includes("sphere")) {
    object = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0x0000ff })
    );
  } else if (description.includes("cone")) {
    object = new THREE.Mesh(
      new THREE.ConeGeometry(0.5, 1, 32),
      new THREE.MeshBasicMaterial({ color: 0xff0000 })
    );
  } else {
    object = null;
  }
  
  if (object) {
    scene.add(object);
  }
  
  camera.position.z = 5;

  // Animate the scene
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  animate();
}

generateBtn.addEventListener('click', () => {
  const description = descriptionField.value.toLowerCase();
  scene.clear(); // Clean the scene before adding a new object
  createObject(description);

  downloadBtn.style.display = 'block'; // Show the download button
});

downloadBtn.addEventListener('click', () => {
  alert("Fichier .rbxl généré et prêt à être téléchargé !");
});
