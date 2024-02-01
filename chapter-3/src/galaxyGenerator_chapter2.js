import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI({
    closed: true,
    width: 400
})

const textureLoader = new THREE.TextureLoader();
const particleTexture = textureLoader.load('textures/particles/2.png')

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Galaxy
 */
const parameter = {
    count: 100000,
    size: 0.01,
    radius: 5,
    branches: 3,
    spin: 1,
    randomness: 0.2,
    randomnessPower: 3,
    insideColor: '#ff6030',
    outsideColor: '#1b3984',
}

let galaxyGeometry = null;
let galaxyMaterial = null;
let particles = null;

const generateGalaxy = () => {

    // destroy old generated galaxy;
    if (particles) {
        galaxyGeometry.dispose();
        galaxyMaterial.dispose();
        scene.remove(particles);
    }

    galaxyGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(parameter.count * 3);
    const colors = new Float32Array(parameter.count * 3);

    const colorInside = new THREE.Color(parameter.insideColor);
    const colorOutside = new THREE.Color(parameter.outsideColor);

    for (let i = 0; i < parameter.count; i++) {
        const i3 = i * 3;
        const radius = Math.random() * parameter.radius;
        const spinAngle = radius * parameter.spin
        const branchAngle = (i % parameter.branches) / parameter.branches * Math.PI * 2;
        const randomX = Math.pow(Math.random(), parameter.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)
        const randomY = Math.pow(Math.random(), parameter.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)
        const randomZ = Math.pow(Math.random(), parameter.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)
        positions[i3 + 0] = Math.cos(branchAngle + spinAngle) * radius + randomX;
        positions[i3 + 1] = randomY;
        positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

        // colors
        const mixColor = colorInside.clone();
        mixColor.lerp(colorOutside, radius/parameter.radius);
        colors[i3] = mixColor.r
        colors[i3 + 1] = mixColor.g
        colors[i3 + 2] = mixColor.b
    }
    galaxyGeometry.setAttribute(
        'position',
        new THREE.BufferAttribute(positions, 3)
    )
    galaxyGeometry.setAttribute(
        'color',
        new THREE.BufferAttribute(colors, 3)
    )
    galaxyMaterial = new THREE.PointsMaterial({
        size: parameter.size,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true
    });
    particles = new THREE.Points(galaxyGeometry, galaxyMaterial)
    scene.add(particles);
}
generateGalaxy()


// debug ui
gui.add(parameter, 'count').min(100).max(1000000).step(100).onFinishChange(generateGalaxy)
gui.add(parameter, 'size').min(0.01).max(0.1).step(0.01).onFinishChange(generateGalaxy)
gui.add(parameter, 'radius').min(0.01).max(20).step(0.01).onFinishChange(generateGalaxy)
gui.add(parameter, 'branches').min(2).max(20).step(1).onFinishChange(generateGalaxy)
gui.add(parameter, 'spin').min(-5).max(20).step(0.01).onFinishChange(generateGalaxy)
gui.add(parameter, 'randomness').min(0).max(2).step(0.01).onFinishChange(generateGalaxy)
gui.add(parameter, 'randomnessPower').onFinishChange(generateGalaxy)
gui.addColor(parameter, 'insideColor').onFinishChange(generateGalaxy)





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
camera.position.x = 3
camera.position.y = 3
camera.position.z = 3
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

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // particles.rotation.z = elapsedTime *0.05

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()