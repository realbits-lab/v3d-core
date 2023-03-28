import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { Color3, Vector3 } from "@babylonjs/core/Maths/math";
import { Engine } from "@babylonjs/core/Engines/engine";
import { DirectionalLight } from "@babylonjs/core/Lights/directionalLight";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { PointLight } from "@babylonjs/core/Lights/pointLight";
import { ShadowGenerator } from "@babylonjs/core/Lights/Shadows/shadowGenerator";
import { SceneLoader } from "@babylonjs/core/Loading/sceneLoader";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { Scene } from "@babylonjs/core/scene";
import type { VRMManager } from "../src/importer/babylon-vrm-loader/src/vrm-manager";

import { GLTFLoader } from "@babylonjs/loaders/glTF/2.0";

import "@babylonjs/core/Helpers/sceneHelpers";
import "@babylonjs/core/Meshes/Builders/sphereBuilder";
import "@babylonjs/core/Meshes/Builders/torusKnotBuilder";
import "@babylonjs/inspector";
// eslint-disable-next-line import/no-internal-modules
import * as BVL from "./importer/babylon-vrm-loader/src/index";

import { V3DCore } from "./index";
import {
  VRMFileLoader,
  VRMLoaderExtension,
} from "./importer/babylon-vrm-loader/src";

// window.onload = async (e) => {
async function main2() {
  //* Define vrm file path.
  const vrmFile = "./testfiles/default.vrm";

  //* Create an Engine instance.
  const canvas = document.getElementById("main-canvas") as HTMLCanvasElement;
  const debugProperties = getDebugProperties();
  console.log("debugProperties.webgl1: ", debugProperties.webgl1);
  const engine = new Engine(canvas, true, {
    alpha: false,
    disableWebGL2Support: debugProperties.webgl1,
  });
  const scene = new Scene(engine);
  const camera = new ArcRotateCamera(
    "MainCamera1",
    0,
    0,
    3,
    new Vector3(0, 1.2, 0),
    scene,
    true
  );
  camera.lowerRadiusLimit = 0.1;
  camera.upperRadiusLimit = 20;
  camera.wheelDeltaPercentage = 0.01;
  camera.minZ = 0.3;
  camera.position = new Vector3(0, 1.2, -3);
  camera.attachControl(canvas, true);

  //* Create a V3DCore instance.
  const v3DCore = new V3DCore(engine, scene, camera);
  v3DCore.transparentBackground();
  await v3DCore.AppendAsync("", vrmFile);

  // Get managers
  // const vrmManager = v3DCore.getVRMManagerByURI(vrmFile);
  // console.log("vrmManager: ", vrmManager);

  // Camera
  // v3DCore.attachCameraTo(vrmManager);

  // Lights
  v3DCore.addAmbientLight(new Color3(1, 1, 1));

  // Lock camera target
  // v3DCore.scene.onBeforeRenderObservable.add(() => {
  //   vrmManager.cameras[0].setTarget(vrmManager.rootMesh.getAbsolutePosition());
  // });

  engine.runRenderLoop(() => {
    v3DCore.scene.render();
  });
}

async function main1() {
  if (SceneLoader) {
    SceneLoader.RegisterPlugin(new BVL.VRMFileLoader());
  }
  // GLTFLoader.RegisterExtension("VRM", (loader) => {
  //   console.log("loader: ", loader);
  //   console.log("loader.babylonScene: ", loader.babylonScene);
  //   return new VRM(loader);
  // });

  const debugProperties = getDebugProperties();
  const canvas = document.getElementById("main-canvas") as HTMLCanvasElement;
  const engine = new Engine(canvas, true, {
    alpha: false,
    disableWebGL2Support: debugProperties.webgl1,
  });
  const scene = new Scene(engine);
  const camera = new ArcRotateCamera(
    "MainCamera1",
    0,
    0,
    3,
    new Vector3(0, 1.2, 0),
    scene,
    true
  );
  camera.lowerRadiusLimit = 0.1;
  camera.upperRadiusLimit = 20;
  camera.wheelDeltaPercentage = 0.01;
  camera.minZ = 0.3;
  camera.position = new Vector3(0, 1.2, -3);
  camera.attachControl(canvas, true);
  console.log("camera: ", camera);

  const directionalLight = new DirectionalLight(
    "DirectionalLight1",
    new Vector3(0, -0.5, 1.0),
    scene
  );
  directionalLight.position = new Vector3(0, 25, -50);
  directionalLight.setEnabled(true);

  (window as any).currentScene = scene;
  engine.runRenderLoop(() => {
    scene.render();
  });
  const response = await SceneLoader.AppendAsync(
    "",
    "./testfiles/default.vrm",
    scene
  );
  // const response = await SceneLoader.LoadAsync(
  //   "file:",
  //   "./testfiles/default.vrm",
  //   engine
  // );
  console.log("response: ", response);
  console.log("response.metadata: ", response.metadata);
}

async function main() {
  if (SceneLoader) {
    SceneLoader.RegisterPlugin(new BVL.VRMFileLoader());
  }
  // GLTFLoader.RegisterExtension("VRM", (loader) => {
  //   console.log("loader: ", loader);
  //   return new BVL.VRMLoaderExtension(loader);
  // });

  const debugProperties = getDebugProperties();
  const canvas = document.getElementById("main-canvas") as HTMLCanvasElement;
  console.log("debugProperties.webgl1: ", debugProperties.webgl1);
  const engine = new Engine(canvas, true, {
    alpha: false,
    disableWebGL2Support: debugProperties.webgl1,
  });
  console.log("engine: ", engine);
  const scene = new Scene(engine);
  console.log("scene: ", scene);
  const camera = new ArcRotateCamera(
    "MainCamera1",
    0,
    0,
    3,
    new Vector3(0, 1.2, 0),
    scene,
    true
  );
  camera.lowerRadiusLimit = 0.1;
  camera.upperRadiusLimit = 20;
  camera.wheelDeltaPercentage = 0.01;
  camera.minZ = 0.3;
  camera.position = new Vector3(0, 1.2, -3);
  camera.attachControl(canvas, true);
  console.log("camera: ", camera);

  scene.createDefaultEnvironment({
    createGround: true,
    createSkybox: false,
    enableGroundMirror: false,
    enableGroundShadow: false,
  });

  // Lights
  const directionalLight = new DirectionalLight(
    "DirectionalLight1",
    new Vector3(0, -0.5, 1.0),
    scene
  );
  directionalLight.position = new Vector3(0, 25, -50);
  directionalLight.setEnabled(true);
  const hemisphericLight = new HemisphericLight(
    "HemisphericLight1",
    new Vector3(-0.2, -0.8, -1),
    scene
  );
  hemisphericLight.setEnabled(false);
  const pointLight = new PointLight("PointLight1", new Vector3(0, 0, 1), scene);
  pointLight.setEnabled(false);

  // Meshes
  const standardMaterialSphere = Mesh.CreateSphere(
    "StandardMaterialSphere1",
    16,
    1,
    scene
  );
  standardMaterialSphere.position = new Vector3(1.5, 1.2, 0);
  standardMaterialSphere.receiveShadows = true;

  const shadowCaster = Mesh.CreateTorusKnot(
    "ShadowCaster",
    1,
    0.2,
    32,
    32,
    2,
    3,
    scene
  );
  shadowCaster.position = new Vector3(0.0, 5.0, -10.0);
  shadowCaster.setEnabled(debugProperties.shadow);
  if (debugProperties.shadow) {
    const shadowGenerator = new ShadowGenerator(1024, directionalLight);
    shadowGenerator.addShadowCaster(shadowCaster);
  }

  if (debugProperties.inspector) {
    await scene.debugLayer.show({
      globalRoot: document.getElementById("wrapper") as HTMLElement,
    });
  }

  // Expose current scene
  (window as any).currentScene = scene;

  scene.onBeforeRenderObservable.add(() => {
    // SpringBone
    if (!scene.metadata || !scene.metadata.vrmManagers) {
      return;
    }
    const managers = scene.metadata.vrmManagers as VRMManager[];
    const deltaTime = scene.getEngine().getDeltaTime();
    managers.forEach((manager) => {
      manager.update(deltaTime);
    });
  });
  engine.runRenderLoop(() => {
    scene.render();
    shadowCaster.rotate(Vector3.Up(), 0.01);
  });
  window.addEventListener("resize", () => {
    engine.resize();
  });
  console.log("try to call SceneLoader.AppendAsync()");
  console.log("SceneLoader: ", SceneLoader);
  // await SceneLoader.AppendAsync("./", "AliciaSolid.vrm", scene);
  // await SceneLoader.AppendAsync("./", "7822444336497004526.vrm", scene);
  await SceneLoader.AppendAsync("./", "default.vrm", scene);

  console.log("try to call addEventListener()");
  let fileCount = 1;
  (document.getElementById("file-input") as HTMLInputElement).addEventListener(
    "change",
    (evt) => {
      const file = (evt as any).target.files[0];
      console.log(`loads ${file.name} ${file.size} bytes`);
      const currentMeshCount = scene.meshes.length;
      SceneLoader.Append("file:", file, scene, () => {
        console.log(`loaded ${file.name}`);
        for (let i = currentMeshCount; i < scene.meshes.length; i++) {
          scene.meshes[i].translate(Vector3.Right(), 1.5 * fileCount);
          scene.meshes[i].receiveShadows = true;
        }
        fileCount++;
      });
    }
  );
}

interface DebugProperties {
  webgl1: boolean;
  shadow: boolean;
  inspector: boolean;
}

function getDebugProperties(): DebugProperties {
  const href = window.location.href;

  return {
    webgl1: href.includes("webgl1"),
    shadow: href.includes("shadow"),
    inspector: href.includes("inspector"),
  };
}

main2().catch((reason) => {
  console.error(reason);
});
