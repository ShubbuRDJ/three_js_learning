// import * as THREE from 'three'
// import gsap from 'gsap'

// // Canvas
// const canvas = document.querySelector('canvas.webgl')

// // Scene
// const scene = new THREE.Scene()

// /**
//  * Objects
//  */
// const geometry = new THREE.BoxGeometry(1, 1, 1, 5, 5, 5)
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
// const mesh = new THREE.Mesh(geometry, material)

// //***************position*********************** 
// // mesh.position.set(0.7,-0.6,1)
// scene.add(mesh)


// // ***************AxesHelper****************** 

// const axesHelper = new THREE.AxesHelper(3);
// scene.add(axesHelper)



// /**
//  * Sizes
//  */
// const sizes = {
//     width: 800,
//     height: 600
// }

// /**
//  * Camera
//  */

// // perspective cmera 
// // const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)

// // orthographic camera 

// const aspectRatio = sizes.width / sizes.height;
// const camera = new THREE.OrthographicCamera(-1
//     , 1 * aspectRatio
//     , 1 * aspectRatio
//     , -1
//     , 0.1
//     , 100
// )


// camera.position.z = 2
// camera.position.x = 2
// camera.position.y = 2
// scene.add(camera)
// camera.lookAt(mesh.position)

// /**
//  * Renderer
//  */
// const renderer = new THREE.WebGLRenderer({
//     canvas: canvas
// })
// renderer.setSize(sizes.width, sizes.height)


// // adaptation of framerate  using Clock class of three.js
// const clock = new THREE.Clock();

// const animateFunc = () => {

//     // adaptation of framerate  using vanilla js
//     // const currentTime = Date.now();
//     // const deltaTime = currentTime - time;
//     // time = currentTime;
//     // mesh.rotation.y += 0.001 * deltaTime;

//     // or 

//     // adaptation of framerate  using Clock class of three.js
//     const elapsedTime = clock.getElapsedTime();
//     mesh.rotation.y = elapsedTime;

//     // camera.lookAt(mesh.position)


//     renderer.render(scene, camera)
//     window.requestAnimationFrame(animateFunc);
// }
// animateFunc();







// ********************************for mouse control******************************************* 



// import * as THREE from 'three'
// import gsap from 'gsap'

// // Canvas
// const canvas = document.querySelector('canvas.webgl')

// // Scene
// const scene = new THREE.Scene()

// /**
//  * Objects
//  */
// const geometry = new THREE.BoxGeometry(1, 1, 1, 5, 5, 5)
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
// const mesh = new THREE.Mesh(geometry, material)

// //***************position*********************** 
// // mesh.position.set(0.7,-0.6,1)
// scene.add(mesh)


// // ***************AxesHelper****************** 

// const axesHelper = new THREE.AxesHelper(3);
// scene.add(axesHelper)



// // *************************cursor event***************************

// const cursor = {
//     x:0,
//     y:0,
// }

// window.addEventListener('mousemove',(event)=>{
//     // devision of clientX with sizes.width gives the value (0-1)
//     // for left -ve and for right +ve value so substract with 0.5
//     cursor.x = event.clientX / sizes.width - 0.5;
//     cursor.y = -(event.clientY / sizes.height - 0.5)
//     console.log(cursor.y);
// })



// /**
//  * Sizes
//  */
// const sizes = {
//     width: 800,
//     height: 600
// }

// /**
//  * Camera
//  */

// // perspective cmera 
// const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)



// camera.position.z = 3
// scene.add(camera)
// camera.lookAt(mesh.position)

// /**
//  * Renderer
//  */
// const renderer = new THREE.WebGLRenderer({
//     canvas: canvas
// })
// renderer.setSize(sizes.width, sizes.height)



// const animateFunc = () => {

//     // update the camera position 
//     camera.position.x = Math.sin(cursor.x * Math.PI *2)*3
//     camera.position.z = Math.cos(cursor.x * Math.PI *2) *3
//     camera.position.y = Math.sin(cursor.y *Math.PI *2)
//     camera.lookAt(mesh.position)

//     renderer.render(scene, camera)
//     window.requestAnimationFrame(animateFunc);
// }
// animateFunc();



// ************************built-in control (orbit control)**************************  



import * as THREE from 'three'
import gsap from 'gsap';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 1, 1, 5, 5, 5)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)

//***************position*********************** 
// mesh.position.set(0.7,-0.6,1)
scene.add(mesh)


// ***************AxesHelper****************** 

const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper)



// *************************cursor event***************************

const cursor = {
    x:0,
    y:0,
}

window.addEventListener('mousemove',(event)=>{
    // devision of clientX with sizes.width gives the value (0-1)
    // for left -ve and for right +ve value so substract with 0.5
    cursor.x = event.clientX / sizes.width - 0.5;
    cursor.y = -(event.clientY / sizes.height - 0.5)
})



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

// perspective cmera 
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)



camera.position.z = 3
scene.add(camera)
camera.lookAt(mesh.position)

// ************orbit control *****************
const orbitControl = new OrbitControls(camera,canvas);
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
