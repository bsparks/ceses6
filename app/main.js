'use strict';

import THREE from 'three';

import {World, Entity, Component} from '../ces/ces';

import SomeSystem from './game/something';
import timing from './timing';

import SceneManager from '../graphics/sceneManager';

window.THREE = THREE;

window.foo = new Component({ test: 'abc', bar: 1, twingle: [1, 2, 3] });

var world = window.world = new World();

var scene, renderer, camera;

scene = new THREE.Scene();
world.scene = scene;

camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.z = 1000;

var light = new THREE.PointLight(0xffffff, 0.8);
scene.add(light);

scene.add(new THREE.AmbientLight(0x404040));

renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

world.addSystem(new SomeSystem());
world.addSystem(new SceneManager(scene));

var e1 = new Entity();
e1.addComponent('transform', {
    position: new THREE.Vector3(),
    rotation: new THREE.Vector3(),
    scale: new THREE.Vector3(1, 1, 1)
});
var e2 = new Entity();
e2.addComponent('transform', {
    position: new THREE.Vector3(-300, 0, 0),
    rotation: new THREE.Vector3(),
    scale: new THREE.Vector3(1, 1, 1)
});
e2.addComponent('primitive');
e2.addComponent('spins');
var e3 = new Entity();
e3.addComponent('ghostId', { id: 'blah' });
e3.addComponent('transform', {
    position: new THREE.Vector3(300, 0, 0),
    rotation: new THREE.Vector3(),
    scale: new THREE.Vector3(1, 1, 1)
});
e3.addComponent('primitive');
e3.addComponent('spins');

world.addEntities(e1, e2, e3);

var last = 0;
function loop() {
    requestAnimationFrame(loop);

    let current = performance.now();
    let delta = current - last;

    timing.elapsed += delta;
    timing.frameTime = delta;

    last = current;

    world.update(delta);

    renderer.render(scene, camera);
}

loop();

