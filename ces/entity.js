'use strict';

var ENTITY_ID = 0;

class Entity {
    constructor() {
       this.id = ++ENTITY_ID;

       this.components = new Map();
    }

    getComponentNames() {
        return this.components.keys();
    }

    addComponent(componentName, componentData = {}) {
        // TODO: ignore if exists or overwrite?

        // TODO: require componentData to be instance of Component?
        
        this.components.set(componentName, componentData);
    }
}

export default Entity;