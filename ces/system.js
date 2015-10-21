'use strict';

class System {
    active = true;

    update(dt) {
        if (!this.active) {
            return;
        }
    }
}

export default System;