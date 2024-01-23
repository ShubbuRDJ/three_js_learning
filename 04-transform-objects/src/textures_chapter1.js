import * as THREE from 'three'
import gsap from 'gsap';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';
import colorImage from '../static/textures/door/color.jpg';
import metalnessImage from '../static/textures/door/metalness.jpg';
import roughnessImage from '../static/textures/door/roughness.jpg';
import normalImage from '../static/textures/door/normal.jpg';
import heightImage from '../static/textures/door/height.jpg';
import alphaImage from '../static/textures/door/alpha.jpg';
import ambientOcclusionImage from '../static/textures/door/ambientOcclusion.jpg';




// ****************find texture from web******************
// 1. poliigon.com
// 2. 3dTextures.com
// 3. arroway-textures.ch







// debug ui inilialization 
const debugUi = new dat.GUI(
    {
        closed: true, // for by-default closed
        width:400, // for width of control panel
    }
);
// for color 
const debugParamObj = {
    color: 0xffe100,
    spin: () => {
        gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + (Math.PI * 2) })
    }
}
debugUi.addColor(debugParamObj, 'color').onChange(() => {
    material.color.set(debugParamObj.color)
})

debugUi.add(debugParamObj, 'spin')




// ******************for texture******************
// const image = new Image();
// const texture = new THREE.Texture(image)
// image.onload=()=>{
//     texture.needsUpdate = true
// } 
// image.src = textureImage




// ***************texture by TextureLoader****************
const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = ()=>{
    console.log('start')
}
loadingManager.onProgress = ()=>{
    console.log('progress')
}
loadingManager.onLoad = ()=>{
    console.log('loaded')
}
loadingManager.onError = ()=>{
    console.log('error')
}
const textureLoader = new THREE.TextureLoader(loadingManager);
const colorTexture = textureLoader.load(colorImage);
const normalTexture = textureLoader.load(normalImage);
const heightTexture = textureLoader.load(heightImage);
const metalnessTexture = textureLoader.load(metalnessImage);
const roughnessTexture = textureLoader.load(roughnessImage);
const alphaTexture = textureLoader.load(alphaImage);
const ambientOcclusionTexture = textureLoader.load(ambientOcclusionImage);


// ********uv wrapping of texture (transforming texture)************
// colorTexture.repeat.x = 2
// colorTexture.repeat.y = 3
// colorTexture.wrapS = THREE.RepeatWrapping
// colorTexture.wrapT = THREE.RepeatWrapping
// colorTexture.wrapS = THREE.MirroredRepeatWrapping
// colorTexture.wrapT = THREE.MirroredRepeatWrapping
// colorTexture.offset.x = 0.5
// colorTexture.offset.y = 0.5

// colorTexture.rotation = Math.PI * 0.25 // uv coordinates (0,0)
// colorTexture.center.x = 0.5  // uv coordinates (middle of the cube face)
// colorTexture.center.y = 0.5 // ,, ,, ,,, ,, ,, ,,, ,, ,, ,

colorTexture.generateMipmaps = false;
colorTexture.minFilter = THREE.NearestFilter
colorTexture.magFilter = THREE.NearestFilter




// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)



const material = new THREE.MeshBasicMaterial({
    map:colorTexture
})
const mesh = new THREE.Mesh(geometry, material)

//***************position*********************** 
// mesh.position.set(0.7,-0.6,1)
scene.add(mesh)




// ***************AxesHelper****************** 

const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper)



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
camera.lookAt(mesh.position)

// ************orbit control *****************
const orbitControl = new OrbitControls(camera, canvas);
// for damping , enable it and update control in each frame
orbitControl.enableDamping = true;



// *************Debug ui*****************
debugUi.add(mesh.position, 'x').min(-3).max(3).step(0.01).name('red cude x');
debugUi.add(mesh.position, 'y').min(-3).max(3).step(0.01).name('red cude y');
debugUi.add(mesh.position, 'z').min(-3).max(3).step(0.01).name('red cude z');
debugUi.add(mesh, 'visible').name('red cude visibility');
debugUi.add(material, 'wireframe').name('cude wireframe');



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