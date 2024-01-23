
// import * as THREE from 'three'
// import gsap from 'gsap';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// // Canvas
// const canvas = document.querySelector('canvas.webgl')

// // Scene
// const scene = new THREE.Scene()

// /**
//  * Objects
//  */
// const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)
// const material = new THREE.MeshBasicMaterial({ 
//     color: 0xff0000,
//     wireframe:true  // for see the triagles
//  })
// const mesh = new THREE.Mesh(geometry, material)

// //***************position*********************** 
// // mesh.position.set(0.7,-0.6,1)
// scene.add(mesh)


// // ***************AxesHelper****************** 

// const axesHelper = new THREE.AxesHelper(3);
// scene.add(axesHelper)



// // *************************cursor event***************************

// const cursor = {
//     x: 0,
//     y: 0,
// }

// window.addEventListener('mousemove', (event) => {
//     // devision of clientX with sizes.width gives the value (0-1)
//     // for left -ve and for right +ve value so substract with 0.5
//     cursor.x = event.clientX / sizes.width - 0.5;
//     cursor.y = -(event.clientY / sizes.height - 0.5)
// })



// // for full width 
// const sizes = {
//     width: window.innerWidth,
//     height: window.innerHeight
// }

// // for resize 

// window.addEventListener('resize', () => {
//     // update sizes 
//     sizes.width = window.innerWidth;
//     sizes.height = window.innerHeight;
//     // update camera 
//     camera.aspect = sizes.width / sizes.height;
//     camera.updateProjectionMatrix();

//     // update renderer 
//     renderer.setSize(sizes.width, sizes.height)

//     // for set pixel ratio for better quality 
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// })

// // for handle fullscreen 
// window.addEventListener('dblclick', () => {
//     const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement
//     if (!fullscreenElement) {
//         if (canvas.requestFullscreen) {
//             canvas.requestFullscreen();
//         }
//         else if (canvas.webkitRequestFullscreen){
//             canvas.webkitRequestFullscreen();
//         }
//     }
//     else {
//         if (document.exitFullscreen) {
//             document.exitFullscreen();
//         }
//         else if (document.webkitExitFullscreen){
//             document.webkitExitFullscreen();
//         }
//     }
// })


// /**
//  * Camera
//  */

// // perspective cmera 
// const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)



// camera.position.z = 3
// scene.add(camera)
// camera.lookAt(mesh.position)

// // ************orbit control *****************
// const orbitControl = new OrbitControls(camera, canvas);
// // for damping , enable it and update control in each frame
// orbitControl.enableDamping = true;

// /**
//  * Renderer
//  */
// const renderer = new THREE.WebGLRenderer({
//     canvas: canvas
// })
// renderer.setSize(sizes.width, sizes.height)



// const animateFunc = () => {

//     // for damping , enable it and update control in each frame
//     orbitControl.update();

//     renderer.render(scene, camera)
//     window.requestAnimationFrame(animateFunc);
// }
// animateFunc();






// for custom geometry via vertices and faces 

import * as THREE from 'three'
import gsap from 'gsap';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)



const material = new THREE.MeshBasicMaterial({ 
    color: 0xff0000,
    wireframe:true  // for see the triagles
 })
const mesh = new THREE.Mesh(geometry, material)

//***************position*********************** 
// mesh.position.set(0.7,-0.6,1)
scene.add(mesh)


// ***************AxesHelper****************** 

const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper)



// *************************cursor event***************************

const cursor = {
    x: 0,
    y: 0,
}

window.addEventListener('mousemove', (event) => {
    // devision of clientX with sizes.width gives the value (0-1)
    // for left -ve and for right +ve value so substract with 0.5
    cursor.x = event.clientX / sizes.width - 0.5;
    cursor.y = -(event.clientY / sizes.height - 0.5)
})



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
        else if (canvas.webkitRequestFullscreen){
            canvas.webkitRequestFullscreen();
        }
    }
    else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
        else if (document.webkitExitFullscreen){
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
camera.lookAt(mesh.position)

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



const animateFunc = () => {

    // for damping , enable it and update control in each frame
    orbitControl.update();

    renderer.render(scene, camera)
    window.requestAnimationFrame(animateFunc);
}
animateFunc();