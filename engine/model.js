'use strict';

import {Component, System} from '../ces/ces';
import meshCache from './assets/meshCache';
import materialCache from './assets/materialCache';

const COMPONENT_DEFAULTS = {
    asset: ''
};

class ModelComponent extends Component {
    constructor(params) {
        super(Object.assign({}, COMPONENT_DEFAULTS, params));
    }
}

class ModelSystem extends System {
    addedToWorld(world) {
        super.addedToWorld(world);

        world.onEntityAdded('model').add(function(entity) {
            var modelData = entity.getComponent('model');
            // clone existing mesh, asset should point to a cached THREE.Mesh inside an asset mgr
            if (meshCache.has(modelData.asset)) {
                let model = meshCache.get(modelData.asset).clone();
                modelData._model = model;

                if (materialCache.has(modelData.material)) {
                    let material = materialCache.get(modelData.material);
                    model.material = material.clone();
                    model.material.needsUpdate = true;
                }

                if (entity.components.has('sceneObject')) {
                    let sceneObject = entity.getComponent('sceneObject').obj;
                    sceneObject.add(model);
                } else {
                    entity.addComponent('sceneObject', {obj: model});
                }
            }
        });
    }
}

export {ModelComponent, ModelSystem};