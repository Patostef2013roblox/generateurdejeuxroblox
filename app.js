// app.js
const generateBtn = document.getElementById('generateBtn');
const descriptionField = document.getElementById('description');
const previewContainer = document.getElementById('3dPreview');
const downloadBtn = document.getElementById('downloadBtn');

// Configurer la scène, la caméra et le rendu
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: previewContainer });

renderer.setSize(window.innerWidth, window.innerHeight);

const light = new THREE.AmbientLight(0xffffff); // Lumière ambiante
scene.add(light);

// Fonction pour créer un objet en fonction de la description
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

// Lorsque le bouton "Générer" est cliqué
generateBtn.addEventListener('click', () => {
  const description = descriptionField.value.toLowerCase();
  scene.clear(); // Nettoyer la scène
  createObject(description); // Créer l'objet basé sur la description

  // Positionner la caméra
  camera.position.z = 5;

  // Fonction d'animation pour la scène
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  animate();

  // Afficher le bouton de téléchargement
  downloadBtn.style.display = 'block';
});

// Fonction pour télécharger un fichier (à compléter selon tes besoins)
downloadBtn.addEventListener('click', () => {
  alert("Fichier .rbxl généré et prêt à être téléchargé !");
});
