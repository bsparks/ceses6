'use strict';

import System from '../../ces/system';
import THREE from 'three';

class SomeSystem extends System {
    constructor() {
        super();

        this.test = 0;
    }

    addedToWorld(world) {
        super.addedToWorld(world);

        world.onEntityAdded('primitive').add(function (entity) {
            var geometry = new THREE.BoxGeometry(200, 200, 200);
            var material = new THREE.MeshBasicMaterial({ color: 0xff00ff, wireframe: false });
            var mesh = new THREE.Mesh(geometry, material);

            entity.addComponent('sceneObject', {obj: mesh});

            world.scene.add(mesh);
        });
    }

    update(dt) {
        super.update(dt);

        let family = this.world.getFamily('transform', 'spins');
        family.forEach(function (entity) {
            var {rotation} = entity.getComponent('transform');

            rotation.x += 0.001 * dt;
            rotation.z += 0.001 * dt;
        });

        this.world.getFamily('sceneObject', 'transform').forEach(function(entity) {
            var sceneObject = entity.getComponent('sceneObject').obj;
            var {position, rotation} = entity.getComponent('transform');

            sceneObject.position.set(position.x, position.y, position.z);
            sceneObject.rotation.set(rotation.x, rotation.y, rotation.z);
        });

        this.test++;
    }
}

export default SomeSystem;