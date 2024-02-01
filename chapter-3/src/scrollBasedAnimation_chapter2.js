import './style.css'
import * as THREE from 'three'
import * as dat from 'dat.gui'
import gsap from 'gsap';

/**
 * Debug
 */
const gui = new dat.GUI()

const parameters = {
    materialColor: '#ffeded',
    objectDistance: 4
}

gui
    .addColor(parameters, 'materialColor').onChange(() => {
        material.color.set(parameters.materialColor);
        particleMaterial.color.set(parameters.materialColor)
    })




/**
 * Texture
 */
const textureLoader = new THREE.TextureLoader();
const gradientTexture = textureLoader.load('/textures/gradients/3.jpg')
gradientTexture.magFilter = THREE.NearestFilter

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Material
 */
const material = new THREE.MeshToonMaterial({
    color: parameters.materialColor,
    gradientMap: gradientTexture
})
const mesh1 = new THREE.Mesh(
    new THREE.TorusGeometry(1, 0.4, 16, 60),
    material
)
const mesh2 = new THREE.Mesh(
    new THREE.ConeGeometry(1, 2, 32),
    material
)
const mesh3 = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16),
    material
)

mesh1.position.y = - parameters.objectDistance * 0
mesh2.position.y = - parameters.objectDistance * 1
mesh3.position.y = - parameters.objectDistance * 2

mesh1.position.x = 2
mesh2.position.x = -2
mesh3.position.x = 2

scene.add(mesh1, mesh2, mesh3)

const meshArray = [mesh1, mesh2, mesh3];





/**
 * Particles
 */
//geometry 
const particleCount = 200;
const positions = new Float32Array(particleCount * 3)
for (let i = 0; i < particleCount; i++) {
    positions[i * 3 + 0] = (Math.random() - 0.5) *10
    positions[i * 3 + 1] = parameters.objectDistance * 0.5 - Math.random() * parameters.objectDistance * meshArray.length
    positions[i * 3 + 2] = (Math.random() - 0.5)*10
}
const particleGeometry = new THREE.BufferGeometry()
particleGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(positions, 3)
)
// material
const particleMaterial = new THREE.PointsMaterial(
    {
        color: parameters.materialColor,
        sizeAttenuation: true,
        size: 0.03
    }
)
const particles = new THREE.Points(particleGeometry, particleMaterial);
scene.add(particles)




/**
 * Light
 */
const directionalLight = new THREE.DirectionalLight("#ffffff", 1);
directionalLight.position.set(1, 1, 0)
scene.add(directionalLight)

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
 * camera group
 */
const cameraGroup = new THREE.Group();
scene.add(cameraGroup)

// Base camera
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 6
cameraGroup.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


/**
 * Scroll
 */
let scrollY = window.scrollY;
let currentSection = 0

window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
    const newSection = Math.round(scrollY/sizes.height)
    if(newSection !== currentSection){
        currentSection = newSection;
        gsap.to(
            meshArray[currentSection].rotation,{
                duration:1.5,
                ease:'power2.inOut',
                x:'+=6',
                y:'+=3',
                z:'+=1.5'
            }
        )
    }
})


/**
 * Cursor
 */
const cursor = {
    x: 0,
    y: 0
}
window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5;
    cursor.y = event.clientY / sizes.height - 0.5;
})




/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0;

const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    // for every screen resolution animation remain same
    const deltaTime = elapsedTime - previousTime;
    previousTime = elapsedTime;

    // rotate meshes
    for (const mesh of meshArray) {
        mesh.rotation.x += deltaTime * 0.15
        mesh.rotation.y += deltaTime * 0.18
    }

    // animate camera 
    camera.position.y = - scrollY / sizes.height * parameters.objectDistance
    const parallelX = cursor.x * 0.5;
    const parallelY = -cursor.y * 0.5
    cameraGroup.position.x += (parallelX - cameraGroup.position.x) * 5 * deltaTime
    cameraGroup.position.y += (parallelY - cameraGroup.position.y) * 5 * deltaTime


    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()