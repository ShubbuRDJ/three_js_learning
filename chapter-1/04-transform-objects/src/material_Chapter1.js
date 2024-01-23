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
import metcaps1Image from '../static/textures/matcaps/3.png'
import gradient3Image from '../static/textures/gradients/3.jpg';
import environmentImage1 from '../static/textures/environmentMaps/4/px.png';
import environmentImage2 from '../static/textures/environmentMaps/4/nx.png';
import environmentImage3 from '../static/textures/environmentMaps/4/py.png';
import environmentImage4 from '../static/textures/environmentMaps/4/ny.png';
import environmentImage5 from '../static/textures/environmentMaps/4/pz.png';
import environmentImage6 from '../static/textures/environmentMaps/4/nz.png';




// ****************find texture from web******************
// 1. poliigon.com
// 2. 3dTextures.com
// 3. arroway-textures.ch







// debug ui inilialization 
const debugUi = new dat.GUI(
    {
        closed: true, // for by-default closed
        width: 400, // for width of control panel
    }
);



// environment map via cube texture loader
const cubeTextureLoader = new THREE.CubeTextureLoader();

const environmentMapTexture = cubeTextureLoader.load([
    environmentImage1,
    environmentImage2,
    environmentImage3,
    environmentImage4,
    environmentImage5,
    environmentImage6,
])





// ***************texture by TextureLoader****************
const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = () => {
    console.log('start')
}
loadingManager.onProgress = () => {
    console.log('progress')
}
loadingManager.onLoad = () => {
    console.log('loaded')
}
loadingManager.onError = () => {
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
const metcaps1Texture = textureLoader.load(metcaps1Image)
const gradient3Texture = textureLoader.load(gradient3Image)


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

// const material = new THREE.MeshBasicMaterial({
//     map:colorTexture
// })

// or 

// ********mesh basic material **********

// const material = new THREE.MeshBasicMaterial();
// material.map = colorTexture
// material.color = new THREE.Color('gold')
// material.transparent = true 
// material.opacity = 0.5;
// material.alphaMap = alphaTexture
// material.side = THREE.DoubleSide 

// ********** mesh normal material***********
// const material = new THREE.MeshNormalMaterial()
// material.wireframe = true
// material.flatShading = true

// *********** mesh matcap material*********
// const material = new THREE.MeshMatcapMaterial()
// material.side = THREE.DoubleSide
// material.matcap = metcaps1Texture

// ***********mesh depth material************
// const material = new THREE.MeshDepthMaterial()

// *************mesh lamber material**********
// to see add lights 
// const material = new THREE.MeshLambertMaterial();

// **************mesh phong material***********
// const material = new THREE.MeshPhongMaterial();
// material.shininess =100
// material.specular = new THREE.Color('green')

// *************mesh toon material****************
// const material = new THREE.MeshToonMaterial();
// gradient3Texture.minFilter = THREE.NearestFilter
// gradient3Texture.magFilter = THREE.NearestFilter
// // if we use THREE.NearestFilter then deactivate generateMipMaps 
// gradient3Texture.generateMipmaps = false
// material.gradientMap = gradient3Texture 

// *************** mesh standard material**********
// const material = new THREE.MeshStandardMaterial();
// material.metalness = 0
// material.roughness = 1
// material.map = colorTexture
// material.aoMap = ambientOcclusionTexture
// material.aoMapIntensity = 1
// material.displacementMap = heightTexture
// material.displacementScale = 0.05;
// material.metalnessMap= metalnessTexture
// material.roughnessMap = roughnessTexture
// material.normalMap = normalTexture
// material.normalScale.set(0.5,0.5)


// ********* Environment map************
const material = new THREE.MeshStandardMaterial();
material.metalness = 1
material.roughness = 0
material.side = THREE.DoubleSide
material.envMap = environmentMapTexture






const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 64, 64),
    material
)
sphere.position.x = -1.5;
sphere.geometry.setAttribute('uv2',
    new THREE.BufferAttribute(sphere.geometry.attributes.uv.array)
)

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1,100,100),
    material
)
plane.geometry.setAttribute('uv2',
    new THREE.BufferAttribute(plane.geometry.attributes.uv.array)
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 64, 128),
    material
)
torus.position.x = 1.5;
torus.geometry.setAttribute('uv2',
    new THREE.BufferAttribute(torus.geometry.attributes.uv.array)
)



scene.add(sphere, plane, torus)



// **************Lights******************
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
const pointLight = new THREE.PointLight(0xffffff, 50)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)




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
// camera.lookAt(sphere.position)

// ************orbit control *****************
const orbitControl = new OrbitControls(camera, canvas);
// for damping , enable it and update control in each frame
orbitControl.enableDamping = true;



// *************Debug ui*****************
debugUi.add(material, 'metalness').min(0).max(1).step(0.0001);
debugUi.add(material, 'roughness').min(0).max(1).step(0.0001);
debugUi.add(material, 'aoMapIntensity').min(0).max(10).step(0.0001);
debugUi.add(material, 'displacementScale').min(0).max(1).step(0.0001);



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

    plane.rotation.y = elapsedTime * 0.1
    sphere.rotation.y = elapsedTime * 0.1
    torus.rotation.y = elapsedTime * 0.1

    plane.rotation.x = elapsedTime * 0.15
    sphere.rotation.x = elapsedTime * 0.15
    torus.rotation.x = elapsedTime * 0.15

    renderer.render(scene, camera)
    window.requestAnimationFrame(animateFunc);
}
animateFunc();