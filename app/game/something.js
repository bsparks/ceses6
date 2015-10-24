'use strict';

import System from '../../ces/system';
import THREE from 'three';

class SomeSystem extends System {
    addedToWorld(world) {
        super.addedToWorld(world);

        world.onEntityAdded('primitive').add(function (entity) {
            var geometry = new THREE.BoxGeometry(200, 200, 200);
            var material = new THREE.MeshPhongMaterial({ color: 0xff00ff, wireframe: false });
            var mesh = new THREE.Mesh(geometry, material);

            entity.addComponent('sceneObject', {obj: mesh});
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
    }
}

export default SomeSystem;