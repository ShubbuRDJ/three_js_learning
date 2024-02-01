import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import cannon from 'cannon';

/**
 * Debug
 */
const gui = new dat.GUI()

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()

const environmentMapTexture = cubeTextureLoader.load([
    '/textures/environmentMaps/0/px.png',
    '/textures/environmentMaps/0/nx.png',
    '/textures/environmentMaps/0/py.png',
    '/textures/environmentMaps/0/ny.png',
    '/textures/environmentMaps/0/pz.png',
    '/textures/environmentMaps/0/nz.png'
])


/**
 * Physics
 * we need to create a body
 * Bodies are objects that will fall and collide with other bodies.
 * but first, we need to create a shape (box,cylinder,plane,sphere,etc).
 * to update the world we must use the step(...)
 * step take 3 parameters
 * 1. A fixed time step
 * 2. How much time passed since the last step
 * 3. How much iterations the world can apply to catch up with a potential delay
 * 
 * ** force
 * 1. applyForce:- apply a force from a specified point in space(not necessary on the body's surface) like the wind,a small push on a domino or a strong force on an angry bird.
 * 2. applyImpulse:- like applyforce but instead of adding to the force, will add to the velocity.
 * 3. applyLocalForce:- same as applyForce but the coordinates are local to the body (0,0,0 would be center of the body)
 * 4. applyLocalImpulse:- same as applyImulse but the coordinates are local to the body.
 */
// world
const world = new cannon.World(); 
world.gravity.set(0,-9.82,0)

// physics material
const defaultMaterial = new cannon.Material('default')
const defaultContactMaterial = new cannon.ContactMaterial(defaultMaterial,defaultMaterial,{
    friction:0.1,
    restitution:0.7,
})
// world.addContactMaterial(defaultContactMaterial)
world.defaultContactMaterial = defaultContactMaterial

// sphere
const sphereShape = new cannon.Sphere(0.5);
const sphereBody = new cannon.Body({
    mass:1,
    position:new cannon.Vec3(0,3,0),
    shape:sphereShape,
})
sphereBody.applyLocalForce(new cannon.Vec3(150,0,0),new cannon.Vec3(0,0,0))
world.addBody(sphereBody)
// floor
const floorShape = new cannon.Plane();
const floorBody = new cannon.Body({
    mass:0,
    shape:floorShape,

})
floorBody.quaternion.setFromAxisAngle(
    new cannon.Vec3(-1,0,0),
    Math.PI * 0.5
)
world.addBody(floorBody)




/**
 * Test sphere
 */
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    new THREE.MeshStandardMaterial({
        metalness: 0.3,
        roughness: 0.4,
        envMap: environmentMapTexture,
        envMapIntensity: 0.5
    })
)
sphere.castShadow = true
sphere.position.y = 0.5
scene.add(sphere)

/**
 * Floor
 */
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial({
        color: '#777777',
        metalness: 0.3,
        roughness: 0.4,
        envMap: environmentMapTexture,
        envMapIntensity: 0.5
    })
)
floor.receiveShadow = true
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.camera.left = - 7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.shadow.camera.bottom = - 7
directionalLight.position.set(5, 5, 5)
scene.add(directionalLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
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
camera.position.set(- 3, 3, 3)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
let oldElapseTime = 0;

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - oldElapseTime;
    oldElapseTime = elapsedTime;


    
    // update physics world
    sphereBody.applyForce(new cannon.Vec3(-0.5,0,0),sphereBody.position)

    world.step(1/60,deltaTime,3)
    sphere.position.copy(sphereBody.position)


    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()