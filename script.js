import * as THREE from 'three';
import Stats from 'stats.js';

// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const boundingBox = {
    x: [-50, 50],
    y: [-50, 50],
    z: [-50, 50]
};

const colors = [0xff5733, 0x33ff57, 0x3357ff, 0xffff33, 0xff33ff];

// Group to hold sprites
const spriteGroup = new THREE.Group();
scene.add(spriteGroup);

// Initialize Stats.js
const stats = new Stats();
stats.showPanel(0); // 0: fps
document.body.appendChild(stats.dom);


function addFloor() {
    const floorGeometry = new THREE.PlaneGeometry(200, 200);
    const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x808080, side: THREE.DoubleSide });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = Math.PI / 2; // Rotate to lie flat
    floor.position.y = -100; // Position it below the sprites
    scene.add(floor);
}

function addLighting() {
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(50, 50, 50);
    scene.add(directionalLight);

    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);
}

function generateSprites() {
    for (let i = 0; i < 100; i++) {
        const map = new THREE.TextureLoader().load('charizard.png');
        const material = new THREE.SpriteMaterial({
            map: map,
            color: colors[Math.floor(Math.random() * colors.length)] // Randomly assign color
        });

        const sprite = new THREE.Sprite(material);

        // Random position within bounding box
        sprite.position.set(
            THREE.MathUtils.randFloat(boundingBox.x[0], boundingBox.x[1]),
            THREE.MathUtils.randFloat(boundingBox.y[0], boundingBox.y[1]),
            THREE.MathUtils.randFloat(boundingBox.z[0], boundingBox.z[1])
        );

        // Random uniform scale
        const scale = THREE.MathUtils.randFloat(1, 10);
        sprite.scale.set(scale, scale, 1);

        spriteGroup.add(sprite);
    }
}

// Handle sprite interaction
function setupInteraction() {
    let selectedSprite = null;
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Event listener for mouse clicks
    window.addEventListener('click', (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObjects(spriteGroup.children);
        if (intersects.length > 0) {
            const clickedSprite = intersects[0].object;

            spriteGroup.children.forEach(sprite => sprite.scale.set(sprite.scale.x / 1.2, sprite.scale.y / 1.2, 1));

            selectedSprite = clickedSprite;
            selectedSprite.scale.set(selectedSprite.scale.x * 1.5, selectedSprite.scale.y * 1.5, 1);
        } else {
            if (selectedSprite) {
                selectedSprite.scale.set(selectedSprite.scale.x / 1.5, selectedSprite.scale.y / 1.5, 1);
                selectedSprite = null;
            }
        }
    });

    // Event listener for keyboard input
    window.addEventListener('keydown', (event) => {
        if (!selectedSprite) return;

        const moveDistance = 1;
        switch (event.key) {
            case 'ArrowUp':
            case 'w':
                selectedSprite.position.y += moveDistance;
                break;
            case 'ArrowDown':
            case 's':
                selectedSprite.position.y -= moveDistance;
                break;
            case 'ArrowLeft':
            case 'a':
                selectedSprite.position.x -= moveDistance;
                break;
            case 'ArrowRight':
            case 'd':
                selectedSprite.position.x += moveDistance;
                break;
        }
    });
}

function animateSprites() {
    let time = 0;

    function animate() {
        requestAnimationFrame(animate);
        stats.begin();

        time += 0.01;

        spriteGroup.children.forEach((sprite, index) => {
            sprite.rotation.y += 0.02;

            sprite.position.x += Math.sin(time + index) * 0.1;
            sprite.position.z += Math.cos(time + index) * 0.1;
        });

        renderer.render(scene, camera);
        stats.end();
    }

    animate();
}

// Update camera position to be outside the bounding box
camera.position.set(0, 0, Math.max(...boundingBox.x, ...boundingBox.y, ...boundingBox.z) * 2);

// Initialize the scene
function init() {
    addFloor();
    addLighting();
    generateSprites();
    setupInteraction();
    animateSprites();
}

init();