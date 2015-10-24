'use strict';

import {System} from '../ces/ces';

class SceneManager extends System {
    constructor(scene) {
        super();

        this.scene = scene;
    }

    addedToWorld(world) {
        super.addedToWorld(world);

        world.onEntityAdded('sceneObject').add((entity) => {
            let sceneObject = entity.getComponent('sceneObject').obj;
            if (sceneObject) {
                this.scene.add(sceneObject);
                sceneObject.addEventListener('removed', function() {
                    entity.getComponent('sceneObject').obj = null;
                    entity.removeComponent('sceneObject');
                });
            }
        });

        world.onEntityRemoved('sceneObject').add((entity) => {
            let sceneObject = entity.getComponent('sceneObject').obj;

            this.scene.remove(sceneObject);
        });
    }

    update(dt) {
        super.update(dt);

        this.world.getFamily('sceneObject', 'transform').forEach(function(entity) {
            let sceneObject = entity.getComponent('sceneObject').obj;
            let {position, rotation, scale} = entity.getComponent('transform');

            sceneObject.position.copy(position);
            sceneObject.rotation.setFromVector3(rotation);
            sceneObject.scale.copy(scale);
        });
    }
}

export default SceneManager;