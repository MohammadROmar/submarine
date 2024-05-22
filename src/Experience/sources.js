const path = "src/static/";

const texturesPath = path + "textures/";
const soundsPath = path + "sounds/";
const modelsPath = path + "models/";

const sources = [
  {
    name: "environmentMapTexture",
    type: "cubeTexture",
    path: [
      texturesPath + "environmentMap/px.jpg",
      texturesPath + "environmentMap/nx.jpg",
      texturesPath + "environmentMap/py.jpg",
      texturesPath + "environmentMap/ny.jpg",
      texturesPath + "environmentMap/pz.jpg",
      texturesPath + "environmentMap/nz.jpg"
    ]
  },
  {
    name: "waterSurfaceTexture",
    type: "texture",
    path: texturesPath + "water.jpg"
  },
  {
    name: "submarineModel",
    type: "gltfModel",
    path: modelsPath + "ohio-class_submarine_ssbn.glb"
  }
];

export default sources;
