import * as THREE from 'three'

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
// mesh.position.x = 0.7;
// mesh.position.y = -0.6;
// mesh.position.z = 1;
mesh.position.set(0.7,-0.6,1)
scene.add(mesh)

// ************position methods***************** 
// console.log(mesh.position.length())
// mesh.position.normalize();
// console.log(mesh.position.length())

// ***************AxesHelper****************** 

const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper)


// *******************scale objects*************************
// mesh.scale.x =2 
// mesh.scale.y =0.25 
// mesh.scale.z =0.5 
mesh.scale.set(2,0.5,0.5)

// ***************rotate object****************
// 1. with roation
mesh.rotation.reorder('YXZ')
mesh.rotation.x = Math.PI * 0.25;
mesh.rotation.y = Math.PI * 0.25;

// or 
// 2. with quaternion  


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
// camera.lookAt(mesh.position)
// console.log(mesh.position.distanceTo(camera.position), 'distance of object from camera')

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)