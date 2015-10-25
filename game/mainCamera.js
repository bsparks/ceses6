'use strict';

import THREE from 'three';

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000);

export default camera;