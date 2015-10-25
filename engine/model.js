'use strict';

import {Component, System} from '../ces/ces';

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
        });
    }
}

export {ModelComponent, ModelSystem};