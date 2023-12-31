4 properties to transform an object

1. position
2. scale
3. rotation
4. quaternion

every object that is inherited for Object3d will have above 4 properties, example, PerspectiveCamera and Mesh

what is Vector3
what is Euler
what is OrthographicCamera
what is document.fullscreenElement
what are the different types of geometry available
how to handle key press combinations in js, for ex shift+h

Textures used as map and matcap are supposed to be encoded in sRGB.

In the latest versions of Three.js we need to specify it by setting their colorSpace to THREE.SRGBColorSpace:

const texture = new THREE.Texture(image)
texture.colorSpace = THREE.SRGBColorSpace

what is uv coordinates
