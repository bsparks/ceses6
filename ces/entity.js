'use strict';

import Signal from '../core/signal';

var ENTITY_ID = 0;

class Entity {
    constructor() {
       this.id = ++ENTITY_ID;

       this.components = new Map();

       this.onComponentAdded = new Signal();
       this.onComponentRemoved = new Signal();
    }

    getComponentNames() {
        return Array.from(this.components.keys());
    }

    addComponent(componentName, componentData = {}) {
        if (this.components.has(componentName)) {
            return;
        }

        // TODO: require componentData to be instance of Component?

        this.components.set(componentName, componentData);

        this.onComponentAdded.post(componentName, this);
    }

    removeComponent(componentName) {
        this.components.delete(componentName);
        this.onComponentRemoved.post(componentName, this);
    }

    getComponent(componentName) {
        return this.components.get(componentName) || null;
    }
}

export default Entity;