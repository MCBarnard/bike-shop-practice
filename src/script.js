import './style.css'
import * as THREE from 'three'
import * as dat from 'dat.gui'
import Settings from "./config/settings";

// Texture Loader
const loader = new THREE.TextureLoader();
const height = loader.load("height.jpg");
const texture = loader.load("/mountain-texture.jpg");
const alpha = loader.load("/alpha.png");

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.PlaneBufferGeometry(3, 3, 64, 64);

// Materials
const material = new THREE.MeshStandardMaterial({
    color: 'gray',
    map: texture,
    displacementMap: height,
    displacementScale: 0.7,
    alphaMap: alpha,
    transparent: true,
    depthTest: false
});

const plane = new THREE.Mesh(geometry, material);
scene.add(plane)
plane.rotation.x = 181;

// Mesh


// Lights
const pointLight = new THREE.PointLight("#00b3ff", 2)
pointLight.position.x = .2
pointLight.position.y = 10
pointLight.position.z = 4.4
scene.add(pointLight)

// Debug
if (Settings.testing === true) {
    const col = {
        'color': '#00ff00'
    }
    const gui = new dat.GUI()
    const planeFolder = gui.addFolder("Plane")
    planeFolder.add(plane.rotation, 'x').min(0.0).step(0.01);
    const lightsFolder = gui.addFolder("Lighting")
    lightsFolder.add(pointLight.position, 'x').min(0.0).step(0.01);
    lightsFolder.add(pointLight.position, 'y').min(0.0).step(0.01);
    lightsFolder.add(pointLight.position, 'z').min(0.0).step(0.01);
    lightsFolder.add(pointLight, 'intensity').min(0.0).step(0.01);
    lightsFolder.addColor(col, 'color').onChange(val => {
        pointLight.color.set(col.color)
    });
}

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth * 0.6,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth * 0.6,
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 3
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    alpha: true,
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

document.addEventListener("mousemove", animateTerrain);
let mouseY = 0;
function animateTerrain(event) {
    mouseY = event.clientY;
}

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    plane.rotation.z = .5 * elapsedTime;
    plane.material.displacementScale = 0.3 + mouseY * 0.0008

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

// document.getElementById("cyclist-image").src = "dark background cycle cropped.jpg";

// Products section
// Movement Animation

document.getElementById("product-image").src = "totem.png";
const card = document.querySelector('#product-1 .card');
const container = document.querySelector('#product-1.container');
// Items
const title = document.querySelector('#product-1 .title');
const sneaker = document.querySelector('#product-1 .sneaker img');
const purchase = document.querySelector('#product-1 .purchase button');
const description = document.querySelector('#product-1 .info h3');
const product_sizes = document.querySelector('#product-1 .sizes');

// Animate in
container.addEventListener('mousemove', e => {
    let xAxis = (((window.innerWidth / 2) - e.clientX) / 25) * -1;
    let yAxis = ((window.innerHeight / 2) - e.clientY) / 25;

    card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});

// Animate in
container.addEventListener('mouseenter', e => {
    card.style.transition = 'none';
    // Popout effect
    title.style.transform = 'translateZ(80px)';
    sneaker.style.transform = 'translateZ(80px) rotateZ(-45deg)';
    description.style.transform = 'translateZ(60px)';
    product_sizes.style.transform = 'translateZ(50px)';
    purchase.style.transform = 'translateZ(40px)';
})
// Animate out
container.addEventListener('mouseleave', () => {
    card.style.transition = 'all 0.5s ease';
    card.style.transform = 'rotateY(0deg) rotateX(0deg)';
    // Popout effect
    title.style.transform = 'translateZ(0)';
    sneaker.style.transform = 'translateZ(0) rotateZ(0)';
    description.style.transform = 'translateZ(0)';
    product_sizes.style.transform = 'translateZ(0)';
    purchase.style.transform = 'translateZ(0)';
})

// Button animation

document.querySelector('.go-biking-button').addEventListener('click', function(){
    let parent = document.querySelector('.go-biking-button').parentElement;
    if(!parent.classList.contains('active')){
        parent.classList.toggle('active');
        setTimeout(function(){
            parent.classList.remove('active');
        }, 2000);
    }
});
