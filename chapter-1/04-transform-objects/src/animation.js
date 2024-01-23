import * as THREE from 'three'
import gsap from 'gsap'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)

//***************position*********************** 
// mesh.position.set(0.7,-0.6,1)
scene.add(mesh)


// ***************AxesHelper****************** 

const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper)



/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// adaptation of framerate  using vanilla js
// let time = Date.now();

// adaptation of framerate  using Clock class of three.js
const clock = new THREE.Clock();

const animateFunc = () => {

    // adaptation of framerate  using vanilla js
    // const currentTime = Date.now();
    // const deltaTime = currentTime - time;
    // time = currentTime;
    // mesh.rotation.y += 0.001 * deltaTime;

    // or 

    // adaptation of framerate  using Clock class of three.js
    const elapsedTime = clock.getElapsedTime();
    // mesh.rotation.y = elapsedTime;
    // mesh.rotation.y = elapsedTime * Math.PI *2;
    mesh.position.y = Math.sin(elapsedTime);
    mesh.position.x = Math.cos(elapsedTime);

    // camera.lookAt(mesh.position)


    renderer.render(scene, camera)
    window.requestAnimationFrame(animateFunc);
}
animateFunc();