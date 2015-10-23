'use strict';

import System from '../../ces/system';

class SomeSystem extends System {
    constructor() {
        super();

        this.test = 0;
    }

    update(dt) {
        super.update(dt);

        let family = this.world.getFamily('position');
        family.forEach(function(entity) {
            entity.getComponent('position').x += 0.5 * dt;
        });

        this.test++;
    }
}

export default SomeSystem;