import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader.js'
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry.js'
import { BufferGeometry } from 'three'
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const axeshelper = new THREE.AxesHelper();
scene.add(axeshelper);  
// const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );
const textureloader = new THREE.TextureLoader()
const matcaps = textureloader.load('/textures/matcaps/1.jpg')
const matcapss = textureloader.load('/textures/matcaps/3.jpg')
const fontloader = new THREE.FontLoader()

fontloader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) =>{
        const textgeometry = new THREE.TextBufferGeometry(
            'Lets Connect',
            {
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 5,
                bevelEnabled: true,
                bevelThickness:0.03,
                bevelSize:0.02,
                bevelOffset:0,
                bevelSegments:4
                
            }
        )
        textgeometry.computeBoundingBox()
        textgeometry.translate(
            textgeometry.boundingBox.max.x * 0.005 - 2,
            textgeometry.boundingBox.max.y * 0.05 - 0.25 ,
            textgeometry.boundingBox.max.z * 0.05 - 0.45

        )
        // textgeometry.center();

        const textmaterial = new THREE.MeshMatcapMaterial({matcap : matcaps})
        const text = new THREE.Mesh(textgeometry,textmaterial)
        scene.add(text);

        for(let i =0;i <100;i++){
            const donutgeometry = new THREE.TorusGeometry(0.3,0.2,20,45)
            const donutmaterial = new THREE.MeshMatcapMaterial({matcap : matcapss})
            const donut = new THREE.Mesh(donutgeometry,donutmaterial)

            donut.position.x = (Math.random()-0.5) * 10
            donut.position.y = (Math.random()-0.5) * 10
            donut.position.z = (Math.random()-0.5) * 10

            donut.rotation.x = Math.random() * Math.PI
            donut.rotation.y = Math.random() * Math.PI
            const scale = Math.random()
            donut.scale.set(scale,scale,scale)
            scene.add(donut)
        }
    }
)
// Materials

// const material = new THREE.MeshBasicMaterial()
// material.color = new THREE.Color(0xff0000)

// Mesh
// const sphere = new THREE.Mesh(geometry,material)
// scene.add(sphere)

// Lights

// const pointLight = new THREE.PointLight(0xffffff, 0.1)
// pointLight.position.x = 2
// pointLight.position.y = 3
// pointLight.position.z = 4
// scene.add(pointLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
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
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

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

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // sphere.rotation.y = .5 * elapsedTime

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()