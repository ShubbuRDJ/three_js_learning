import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import bakedShadowImage from '../static/textures/bakedShadow.jpg';
import simpleShadowImage from '../static/textures/simpleShadow.jpg';



// baking shadow
const textureLoader = new THREE.TextureLoader()
const bakedShadowTexture = textureLoader.load(bakedShadowImage);


//baking shadows alternative
const simpleShadowTexture = textureLoader.load(simpleShadowImage);




/**
 * Base
 */
// Debug
const gui = new dat.GUI({
    closed: true,
    width: 400
})

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
directionalLight.position.set(2, 2, - 1)
gui.add(directionalLight, 'intensity').min(0).max(1).step(0.001)
gui.add(directionalLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(directionalLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(directionalLight.position, 'z').min(- 5).max(5).step(0.001)
directionalLight.castShadow = true;
// *****optimisation of shadow*******
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
directionalLight.shadow.camera.top = 2
directionalLight.shadow.camera.right = 2
directionalLight.shadow.camera.bottom = -2
directionalLight.shadow.camera.left = -2
directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 6
// blur 
directionalLight.shadow.radius = 10;


const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)

// scene.add(directionalLightCameraHelper)
scene.add(directionalLight)



/**
 * Spot light
 */
const spotLight = new THREE.SpotLight(0xffffff, 1, 10, Math.PI * 0.3);
spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;
spotLight.shadow.camera.fov = 30
spotLight.shadow.camera.far = 6
spotLight.shadow.camera.near = 1

spotLight.position.set(0, 2, 2);

const spotLightCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera)
scene.add(spotLight);
scene.add(spotLight.target);
// scene.add(spotLightCameraHelper);






// point light 
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.castShadow = true;
pointLight.position.set(-1, 1, 0);

pointLight.shadow.mapSize.width = 1024
pointLight.shadow.mapSize.height = 1024
pointLight.shadow.camera.near = 0.1
pointLight.shadow.camera.far = 5

scene.add(pointLight);

const pointLightCameraHelper = new THREE.CameraHelper(pointLight.shadow.camera)
// scene.add(pointLightCameraHelper)










/**
 * Materials
 */
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.7
gui.add(material, 'metalness').min(0).max(1).step(0.001)
gui.add(material, 'roughness').min(0).max(1).step(0.001)

/**
 * Objects
 */
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
)


/**
 * shadow
 * cast shadow for sphere and recieve shadow for plane
 */

sphere.castShadow = true;




const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
    // new THREE.MeshBasicMaterial({
    //     map: bakedShadowTexture
    // })
)

plane.receiveShadow = true;

plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.5

scene.add(sphere, plane)



// baking shadows alternative 
//1. plane for shadow 
const sphereShaow = new THREE.Mesh(
    new THREE.PlaneGeometry(1.5, 1.5),
    new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        alphaMap: simpleShadowTexture
    })
)
sphereShaow.rotation.x = -(Math.PI * 0.5)
// sphereShaow.position.y = plane.position.y
//  prevent z-fighting
sphereShaow.position.y = plane.position.y + 0.01

scene.add(sphereShaow)




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
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
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
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = false;

/**
 * Animate
 */
const clock = new THREE.Clock()

const animateFunc = () => {
    const elapsedTime = clock.getElapsedTime()


    // update the sphere for shadow
    sphere.position.x = Math.cos(elapsedTime) * 1.5
    sphere.position.z = Math.sin(elapsedTime) * 1.5
    sphere.position.y = Math.abs(Math.sin(elapsedTime * 3))

    // update the shadow also
    sphereShaow.position.x = sphere.position.x
    sphereShaow.position.z = sphere.position.z
    sphereShaow.material.opacity = (1 - sphere.position.y) * 0.4


    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(animateFunc)
}

animateFunc()