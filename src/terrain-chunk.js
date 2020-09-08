import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.112.1/build/three.module.js';


export const terrain_chunk = (function() {

  class TerrainChunk {
    constructor(params) {
      this._params = params;
      this._Init(params);
    }
    
    Destroy() {
      this._params.group.remove(this._plane);
    }

    Hide() {
      this._plane.visible = false;
    }

    Show() {
      this._plane.visible = true;
    }

    _Init(params) {
      this._geometry = new THREE.BufferGeometry();
      this._plane = new THREE.Mesh(this._geometry, params.material);
      this._plane.castShadow = false;
      this._plane.receiveShadow = true;
      this._params.group.add(this._plane);
    }

    RebuildMeshFromData(data) {
      this._geometry.setAttribute(
          'position', new THREE.Float32BufferAttribute(data.positions, 3));
      this._geometry.setAttribute(
          'color', new THREE.Float32BufferAttribute(data.colours, 3));
      this._geometry.setAttribute(
          'normal', new THREE.Float32BufferAttribute(data.normals, 3));
      this._geometry.setAttribute(
          'tangent', new THREE.Float32BufferAttribute(data.tangents, 4));
      this._geometry.setAttribute(
          'weights1', new THREE.Float32BufferAttribute(data.weights1, 4));
      this._geometry.setAttribute(
          'weights2', new THREE.Float32BufferAttribute(data.weights2, 4));
      this._geometry.setAttribute(
          'uv', new THREE.Float32BufferAttribute(data.uvs, 2));

    }
  }

  return {
    TerrainChunk: TerrainChunk
  }
})();
