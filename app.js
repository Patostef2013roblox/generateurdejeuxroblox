// app.js
const generateBtn = document.getElementById('generateBtn');
const descriptionField = document.getElementById('description');
const previewContainer = document.getElementById('previewContainer');
const downloadBtn = document.getElementById('downloadBtn');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('3dPreview') });

renderer.setSize(window.innerWidth, window.innerHeight);
previewContainer.appendChild(renderer.domElement);

const light = new THREE.AmbientLight(0xffffff);
scene.add(light);

function createObject(description) {
  let object;

  if (description.includes("cube")) {
    object = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }));
  } else if (description.includes("sphère")) {
    object = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), new THREE.MeshBasicMaterial({ color: 0x0000ff }));
  }

  object.position.set(0, 0, 0);
  scene.add(object);
}

generateBtn.addEventListener('click', () => {
  const description = descriptionField.value.toLowerCase();
  scene.clear(); // Nettoie la scène avant de redessiner
  createObject(description);

  // Positionnement de la caméra
  camera.position.z = 5;

  // Fonction d'animation
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  animate();

  // Affichage du bouton de téléchargement
  downloadBtn.style.display = 'block';
});

downloadBtn.addEventListener('click', () => {
  alert("Fichier .rbxl généré et prêt à être téléchargé !");
});
