'use strict';

import EntityList from './entityList';

class World {
    systems = [];
    entities = new EntityList();

    addSystem(system) {
        this.systems.push(system);
        system.world = this;
    }

    update(dt) {
        this.systems.forEach(system => system.update(dt));
    }
}

export default World;