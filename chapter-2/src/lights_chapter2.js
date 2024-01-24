import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

















// **********************lights********************
/* 1. ambient light
the AmbientLight appies omnidirectional lighting
1.1. color
1.2. Intensity
 */
const AmbientLight = new THREE.AmbientLight();
// or 
// const AmbientLight = new THREE.AmbientLight(0xffffff,0.5) 
AmbientLight.color = new THREE.Color(0xffffff)
AmbientLight.intensity = 0.5;
// scene.add(AmbientLight);



/*
2. Directional light
:- the directional light will have a sun like effect as if the sun rays were travelling in parallel
2.1. color
2.2. Intemsity 
 */

const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.5)
directionalLight.position.set(1, 0.25, 0)
scene.add(directionalLight)




/*
3. Hemisphere light
:- The HemisphereLight is similar to the AmbientLight but with a deifferent color from the sky than the color coming from the ground 
3.1. color(or skyColor)
3.2. groundColor
3.3. Intensity
 */

const HemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.3)
// scene.add(HemisphereLight)



/**
 * 4. Point light
 * The light starts at n infinitely small pont and spread uniformly in every directions
 * 4.1. color
 * 4.2. Intensity
 * 4.3. By default, the light intensity doesn't fade 
 * 4.4. We can control the fade distance and how fast it fades with distance and decay
 */

const pointLight = new THREE.PointLight(0xff9000, 0.5, 10, 3)
pointLight.position.set(1, 1.5, 1);
// scene.add(pointLight)



/**
 * 5. Recr Area light
 * the rect area light works like the big rectangle lights you can see on the photoshoot set
 * it's a mix b/w a directional light and a diffuse light
 * 5.1. color
 * 5.2. Intensity
 * 5.3. width
 * 5.4. height
 * 5.5. Rect area light only works with MeshStandardMaterial and MeshPhysicalMaterial
 */

const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 5, 1, 1)
// scene.add(rectAreaLight)


/**
 * 6. Spot light
 * Spot light is like a flashLight
 * It's a cone of light starting at a point and oriented in a direction
 * 6.1. color
 * 6.2. intensity
 * 6.3. distance
 * 6.4. angle
 * 6.5. penumbra
 * 6.6. decay
 * 6.7. To rotate the spot light we need to add its target property to the scene and move it. 
 */
const spotLight = new THREE.SpotLight(
    0x78ff00, //color
    0.5, // intensity
    6,  //distance
    (Math.PI * 0.1), // angle
    0,    // penumbra
    1,   // decay
)
// scene.add(spotLight)
spotLight.target.position.x = -0.75
// scene.add(spotLight.target)





// *****************Helper of light*************** 
// to assist us with positioning the lights
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight,0.2);
scene.add(directionalLightHelper)




















/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.4

// Objects
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
)
sphere.position.x = - 1.5

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.75, 0.75),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 32, 64),
    material
)
torus.position.x = 1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.65

scene.add(sphere, cube, torus, plane)

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

/**
 * Animate
 */
const clock = new THREE.Clock()

const animateFunc = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    cube.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    cube.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(animateFunc)
}

animateFunc()