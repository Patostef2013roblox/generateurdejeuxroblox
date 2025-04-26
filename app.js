// app.js

const generateBtn = document.getElementById('generateBtn');
const descriptionField = document.getElementById('description');
const previewContainer = document.getElementById('previewContainer');
const downloadBtn = document.getElementById('downloadBtn');

// Créer la scène 3D et la caméra avec THREE.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('3dPreview') });

renderer.setSize(window.innerWidth, window.innerHeight);
previewContainer.appendChild(renderer.domElement);

// Ajouter une lumière ambiante à la scène
const light = new THREE.AmbientLight(0xffffff); // Lumière blanche pour illuminer la scène
scene.add(light);

// Fonction pour créer des objets en fonction de la description
function createObject(description) {
  let object;

  // Crée un cube si la description contient "cube"
  if (description.includes("cube")) {
    object = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ color: 0x00ff00 }) // Cube vert
    );
  } 
  // Crée une sphère si la description contient "sphère"
  else if (description.includes("sphère")) {
    object = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0x0000ff }) // Sphère bleue
    );
  } 
  // Ajoute un terrain si la description contient "terrain"
  else if (description.includes("terrain")) {
    object = new THREE.Mesh(
      new THREE.PlaneGeometry(5, 5),
      new THREE.MeshBasicMaterial({ color: 0xaaaaaa, side: THREE.DoubleSide }) // Terrain gris
    );
    object.rotation.x = -Math.PI / 2; // Rotation du terrain pour qu'il soit horizontal
  } 
  // Ajoute un arbre si la description contient "arbre"
  else if (description.includes("arbre")) {
    const trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.2, 0.2, 2),
      new THREE.MeshBasicMaterial({ color: 0x8B4513 }) // Tronc marron
    );
    trunk.position.y = 1; // Positionne le tronc

    const leaves = new THREE.Mesh(
      new THREE.SphereGeometry(1, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0x228B22 }) // Feuillage vert
    );
    leaves.position.y = 3; // Positionne les feuilles

    object = new THREE.Group();
    object.add(trunk);
    object.add(leaves);
  }

  if (object) {
    object.position.set(0, 0, 0);
    scene.add(object);
  }
}

// Gérer le bouton de génération
generateBtn.addEventListener('click', () => {
  const description = descriptionField.value.toLowerCase(); // Récupère la description en minuscules
  scene.clear(); // Nettoie la scène avant de redessiner
  createObject(description); // Crée l'objet selon la description

  // Positionnement de la caméra pour une meilleure vue
  camera.position.z = 5;

  // Fonction d'animation pour rendre l'aperçu interactif
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera); // Affiche la scène
  }
  
  animate(); // Lance l'animation

  // Affiche le bouton de téléchargement une fois l'objet généré
  downloadBtn.style.display = 'block';
});

// Gérer le bouton de téléchargement
downloadBtn.addEventListener('click', () => {
  alert("Fichier .rbxl généré et prêt à être téléchargé !");
});
