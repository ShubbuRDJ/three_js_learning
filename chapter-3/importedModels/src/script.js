import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import * as dat from 'lil-gui'



/**
 * *************** Imported models**************
 * To create complex shapes, we better use a dedicated 3D software 
 * you can even create your own format
 * some popular formats
 * 1. OBJ
 * 2. FBX
 * 3. STL
 * 4. PLY
 * 5. COLLADA
 * 6. 3DS
 * 7. GLTF 
 * 
 * One format is becoming a standard and should cover most of our needs.
 * ********GLTF format ***************
 * GL transmission format
 * support different sets of data like geometries,materials,cameras,lights,scene graph, animations,skeleton,morphing etc.
 * Various format lke json, binary, embed textures.
 * 
 * you don't have to use GLTF in all cases.
 * 
 * ********* GLTF formats *************
 * A GLTF file can have different formats.
 * 1. glTF   // default format 
 * 2. glTF-Binary
 * 3. glTF-Draco
 * 4. glTF-Embedded
 *  
 * 
 * 
 * 
 * 
 * ****************GLTF Loader ****************
 * we need to use GLTFLoader();
 * 
 * 
 * ***************Draco Compression
 * the draco version can be much lighter than the default version.
 * Compression to applied to the buffer data(typically geometry).
 * Draco is not exclusive to GLTF but populr at the same time and implementation went faster with  glTF exports.
 * 
 * Add the DracoLoader
 * 
 *  
 * 
 * ******** for animation *****
 * the loaded gltf object contains a animations property composed of multiple AnimationCLip
 * 
 * 
 */















/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()



/**
 * Draco Loader
 */
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/draco/')

/**
 * GLTF loader to load the models.
 */

let mixer = null;

const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);
gltfLoader.load(
    // 'models/Duck/glTF/Duck.gltf',
    // 'models/FlightHelmet/glTF/FlightHelmet.glt f',
    // 'models/Duck/glTF-Draco/Duck.gltf',
    'models/Fox/glTF/Fox.gltf',
    (gltf) => {


        // for animation 
        mixer = new THREE.AnimationMixer(gltf.scene);
        const action = mixer.clipAction(gltf.animations[1]);
        action.play();


        // scene.add(gltf.scene.children[0])
        const children = [...gltf.scene.children]
        // for(const child of children){
        //     scene.add(child)
        // }
        gltf.scene.scale.set(0.025, 0.025, 0.025)
        scene.add(gltf.scene)
    }
)





/**
 * Floor
 */
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial({
        color: '#444444',
        metalness: 0,
        roughness: 0.5
    })
)
floor.receiveShadow = true
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
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
camera.position.set(2, 2, 2)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.set(0, 0.75, 0)
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
let previousTime = 0

const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    // Update controls
    controls.update()

    // for animation
    if (mixer) {
        mixer.update(deltaTime)
    }

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()