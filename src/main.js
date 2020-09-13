import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.112.1/build/three.module.js';
import {GUI} from 'https://cdn.jsdelivr.net/npm/three@0.112.1/examples/jsm/libs/dat.gui.module.js';
import {controls} from './controls.js';
import {game} from './game.js';
import {terrain} from './terrain.js';

let _APP = null;


class ProceduralTerrain_Demo extends game.Game {
  constructor() {
    super();
  }

  _OnInitialize() {
    this._CreateGUI();

    this._userCamera = new THREE.Object3D();
    this._userCamera.position.set(4100, 0, 0);
    this._graphics.Camera.position.set(3853, -609, -1509);
    this._graphics.Camera.quaternion.set(0.403, 0.59, -0.549, 0.432);

    this._graphics.Camera.position.set(1412, -1674, -3848);
    this._graphics.Camera.quaternion.set(0.1004, 0.7757, -0.6097, 0.1278);

    this._entities['_terrain'] = new terrain.TerrainChunkManager({
      camera: this._graphics.Camera,
      scene: this._graphics.Scene,
      gui: this._gui,
      guiParams: this._guiParams,
      game: this
    });

    this._entities['_controls'] = new controls.FPSControls({
        camera: this._graphics.Camera,
        scene: this._graphics.Scene,
        domElement: this._graphics._threejs.domElement,
        gui: this._gui,
        guiParams: this._guiParams,
    });

    this._totalTime = 0;

    this._LoadBackground();
  }

  _CreateGUI() {
    this._guiParams = {
      general: {
      },
    };
    this._gui = new GUI();

    const generalRollup = this._gui.addFolder('General');
    this._gui.close();
  }

  _LoadBackground() {
    this._graphics.Scene.background = new THREE.Color(0x000000);
    const loader = new THREE.CubeTextureLoader();
    const texture = loader.load([
        './resources/space-posx.jpg',
        './resources/space-negx.jpg',
        './resources/space-posy.jpg',
        './resources/space-negy.jpg',
        './resources/space-posz.jpg',
        './resources/space-negz.jpg',
    ]);
    this._graphics._scene.background = texture;
  }

  _OnStep(timeInSeconds) {
  }
}


function _Main() {
  _APP = new ProceduralTerrain_Demo();
}

_Main();
