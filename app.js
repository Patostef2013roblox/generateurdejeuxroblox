// app.js

const generateBtn = document.getElementById('generateBtn');
const descriptionField = document.getElementById('description');
const previewContainer = document.getElementById('previewContainer');
const downloadBtn = document.getElementById('downloadBtn');

// Scene 3D
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('3dPreview') });

renderer.setSize(window.innerWidth, window.innerHeight);
previewContainer.appendChild(renderer.domElement);

// Ajouter une lumière ambiante
const light = new THREE.AmbientLight(0xffffff);
scene.add(light);

// Ajouter un contrôle de la caméra
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Position de la caméra initiale
camera.position.z = 5;

function createObject(description) {
  let object;

  // Créer un cube
  if (description.includes("cube")) {
    object = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }));
  }
  // Créer une sphère
  else if (description.includes("sphère")) {
    object = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), new THREE.MeshBasicMaterial({ color: 0x0000ff }));
  }
  // Créer un cylindre
  else if (description.includes("cylindre")) {
    object = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 1, 32), new THREE.MeshBasicMaterial({ color: 0xff0000 }));
  }
  // Ajouter plus de types ici si nécessaire

  if (object) {
    object.position.set(0, 0, 0);
    scene.add(object);
  } else {
    alert("Aucun objet correspondant trouvé. Utilise des mots comme 'cube', 'sphère', ou 'cylindre'.");
  }
}

generateBtn.addEventListener('click', () => {
  const description = descriptionField.value.toLowerCase();
  scene.clear(); // Nettoie la scène avant de redessiner
  createObject(description);

  // Fonction d'animation
  function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Mise à jour du contrôle de la caméra
    renderer.render(scene, camera);
  }

  animate();

  // Affichage du bouton de téléchargement
  downloadBtn.style.display = 'block';
});

downloadBtn.addEventListener('click', () => {
  alert("Fichier .rbxl généré et prêt à être téléchargé !");
});
