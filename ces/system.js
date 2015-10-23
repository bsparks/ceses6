'use strict';

class System {
    constructor() {
        this.active = true;
        this.world = null;
    }

    addedToWorld(world) {
        this.world = world;
    }

    removedFromWorld() {
        this.world = null;
    }

    update(dt) {
        if (!this.active) {
            return;
        }
    }
}

export default System;