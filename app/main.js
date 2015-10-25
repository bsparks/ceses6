'use strict';

import THREE from 'three';

import {World, Entity, Component} from '../ces/ces';

import SomeSystem from './game/something';
import timing from './timing';

import SceneManager from '../engine/sceneManager';
import {LightSystem, LightComponent} from '../engine/light';

import {assetCache} from './preload';

import '../engine/objLoader';

async function initGame() {
    var assets = await assetCache;

    window.THREE = THREE;
    window.assets = assets;

    var objLoader = new THREE.OBJLoader();
    var parsed = objLoader.parse(assets.getResult('crateModel'));
    window.parsed = parsed;
    var crateGeo = parsed.children[0].geometry;
    var crateTex = new THREE.Texture(assets.getResult('crateMaterial'), THREE.UVMapping );
    crateTex.needsUpdate = true;
    var crateMat = new THREE.MeshPhongMaterial( {
        color: 0xffffff,
        specular: 0x000000,
        opacity: 0.4,
        transparent: false,
        map: crateTex,
        shading: THREE.SmoothShading
    } );
    var crateMesh = new THREE.Mesh(crateGeo, crateMat);

    var world = window.world = new World();

    var scene, renderer, camera;

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 1000;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    world.addSystem(new SomeSystem());
    world.addSystem(new LightSystem());
    world.addSystem(new SceneManager(scene));

    var e1 = new Entity();
    e1.addComponent('transform', {
        position: new THREE.Vector3(-300, 300, 0),
        rotation: new THREE.Vector3(),
        scale: new THREE.Vector3(8, 8, 8)
    });
    e1.addComponent('spins');
    e1.addComponent('sceneObject', {obj: crateMesh});

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

    var lightEntity = new Entity('light1');
    lightEntity.addComponent('light', new LightComponent({ intensity: 0.8 }));

    var ambientLighting = new Entity('ambientLight');
    ambientLighting.addComponent('light', new LightComponent({ lightType: 'AmbientLight', color: 0x404040 }));

    world.addEntities(e1, e2, e3, lightEntity, ambientLighting);

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
}

initGame();
