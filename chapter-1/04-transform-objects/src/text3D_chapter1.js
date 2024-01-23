import * as THREE from 'three'
import gsap from 'gsap';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import matcapsImage from '../static/textures/matcaps/1.png'


const scene = new THREE.Scene();

const canvas = document.querySelector('canvas.webgl')



const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load(matcapsImage)



// *************load fonts*************
const fontLoader = new FontLoader();
fontLoader.load(
    'fonts/helvetiker_regular.typeface.json',
    (font) => {
        const textGeometry = new TextGeometry('Shubham Singh', {
            font: font,
            size: 0.5,
            height: 0.2,
            curveSegments: 5,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 4
        });
        // ********for center the text******** 
        // textGeometry.computeBoundingBox();
        // textGeometry.translate(
        //     -(textGeometry.boundingBox.max.x - 0.1) * 0.5,
        //     -(textGeometry.boundingBox.max.y - 0.1) * 0.5,
        //     -(textGeometry.boundingBox.max.z - 0.3) * 0.5,
        // )

        textGeometry.center()
        // const material = new THREE.MeshMatcapMaterial({
        //     matcap: matcapTexture
        // })
        const material = new THREE.MeshNormalMaterial()
        const text = new THREE.Mesh(
            textGeometry,
            material,
        )
        scene.add(text)

        // ******for creation of 100 donuts****** 

        // console.time('donut')
        const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);
        for (let i = 0; i < 300; i++) {
            // const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);
            // const donutMaterial = new THREE.MeshMatcapMaterial({
            //     matcap: matcapTexture
            // })
            const donut = new THREE.Mesh(donutGeometry, material)
            donut.position.x = (Math.random() - 0.5) * 10
            donut.position.y = (Math.random() - 0.5) * 10
            donut.position.z = (Math.random() - 0.5) * 10

            donut.rotation.x = Math.random() * Math.PI
            donut.rotation.y = Math.random() * Math.PI

            const scale = Math.random()
            donut.scale.set(scale, scale, scale)

            scene.add(donut)
        }
        // console.timeEnd('donut')
    }
)



// ***************AxesHelper****************** 

// const axesHelper = new THREE.AxesHelper(3);
// scene.add(axesHelper)



// for full width 
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// for resize 

window.addEventListener('resize', () => {
    // update sizes 
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    // update camera 
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // update renderer 
    renderer.setSize(sizes.width, sizes.height)

    // for set pixel ratio for better quality 
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// for handle fullscreen 
window.addEventListener('dblclick', () => {
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement
    if (!fullscreenElement) {
        if (canvas.requestFullscreen) {
            canvas.requestFullscreen();
        }
        else if (canvas.webkitRequestFullscreen) {
            canvas.webkitRequestFullscreen();
        }
    }
    else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
        else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
})


/**
 * Camera
 */

// perspective cmera 
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)



camera.position.z = 3
scene.add(camera)
// camera.lookAt(sphere.position)

// ************orbit control *****************
const orbitControl = new OrbitControls(camera, canvas);
// for damping , enable it and update control in each frame
orbitControl.enableDamping = true;


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

const clock = new THREE.Clock();
const animateFunc = () => {

    // for damping , enable it and update control in each frame
    orbitControl.update();

    // for continuous rotation 
    const elapsedTime = clock.getElapsedTime();


    renderer.render(scene, camera)
    window.requestAnimationFrame(animateFunc);
}
animateFunc();