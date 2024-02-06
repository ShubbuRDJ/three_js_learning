import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'





/**
 * *********************Raycaster********************
 * A raycaster can cast a ray in a specific direction and test what objects inteswect with it.
 * ****** Use exapmles***********
 * 1. Detect if there is a wall in front of the player
 * 2. Test if the laser gun hit something.
 * 3. Test if something is currently under the mouse to simulate mouse events
 * 4. Show an alert message if the spaceship is heading toward a planet.
 */











/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const object1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
object1.position.x = - 2

const object2 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)

const object3 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
object3.position.x = 2

scene.add(object1, object2, object3)





/**
 * Raycaster code
 */
const rayCaster = new THREE.Raycaster();
// two options
// 1. intersectObject(...) to test one object
// 2. intersectObjects(...) to test an array of objects

/**
 * Each item contains usefull information
 * 1. distance:- distance b/w the origin of the ray and collision point.
 * 2. Face:- what face of the geometry was hit by the ray
 * 3. faceIndex:- the index of that face
 * 4. object:- what object is concerned by the collision.
 * 5. point:- a vector3 of the exact position of the collision.
 * 6. uv:- the UV coordinate in that geometry.
 */









/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
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
camera.position.z = 3
scene.add(camera)



/**
 * Mouse
 * Create a mouse variable with a Vector2 and update it when the mouse is moving
 */
const mouse = new THREE.Vector2();








// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // animate objects
    object1.position.y = Math.sin(elapsedTime * 0.3) * 1.5
    object2.position.y = Math.sin(elapsedTime * 0.8) * 1.5
    object3.position.y = Math.sin(elapsedTime * 1.4) * 1.5

    // cast a ray
    // const rayOrigin = new THREE.Vector3(-3, 0, 0);
    // const rayDirection = new THREE.Vector3(1, 0, 0);
    // rayDirection.normalize()
    // rayCaster.set(rayOrigin, rayDirection)

    // const objectsToTest = [object1,object2,object3]
    // const intersects = rayCaster.intersectObjects(objectsToTest)

    // for(const object of objectsToTest){
    //     object.material.color.set('#ff0000')
    // }

    // for(const intersect of intersects){
    //     intersect.object.material.color.set('#0000ff')
    // }


    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()