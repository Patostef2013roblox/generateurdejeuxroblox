const generateBtn = document.getElementById('generateBtn');
const descriptionField = document.getElementById('description');
const previewCanvas = document.getElementById('3dPreview');
const downloadBtn = document.getElementById('downloadBtn');

// THREE.js base
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, previewCanvas.clientWidth / previewCanvas.clientHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: previewCanvas, antialias: true });
renderer.setSize(previewCanvas.clientWidth, previewCanvas.clientHeight);

const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
scene.add(light);

camera.position.z = 5;

// IA simulée (début simple)
function interpret(description) {
  const desc = description.toLowerCase();
  const objects = [];

  if (desc.includes("cube")) {
    objects.push(new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshStandardMaterial({ color: 0x00ff00 })
    ));
  }

  if (desc.includes("sphère") || desc.includes("sphere")) {
    objects.push(new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 32, 32),
      new THREE.MeshStandardMaterial({ color: 0x0000ff, transparent: true, opacity: 0.6 })
    ));
  }

  if (desc.includes("arbre")) {
    const trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.2, 0.2, 1.5),
      new THREE.MeshStandardMaterial({ color: 0x8B4513 })
    );
    trunk.position.y = 0.75;

    const leaves = new THREE.Mesh(
      new THREE.SphereGeometry(0.8, 16, 16),
      new THREE.MeshStandardMaterial({ color: 0x228B22 })
    );
    leaves.position.y = 1.8;

    objects.push(trunk, leaves);
  }

  return objects;
}

// Génération
generateBtn.addEventListener('click', () => {
  scene.clear();
  scene.add(light);

  const desc = descriptionField.value;
  const elements = interpret(desc);

  if (elements.length === 0) {
    alert("😢 L'IA n'a pas compris. Essaie d'ajouter 'cube', 'sphère', 'arbre'...");
    return;
  }

  elements.forEach(obj => scene.add(obj));

  renderer.render(scene, camera);
  downloadBtn.style.display = "block";
});

downloadBtn.addEventListener('click', () => {
  alert("Téléchargement du .rbxl bientôt disponible dans la version PRO ULTRA IA !");
});
