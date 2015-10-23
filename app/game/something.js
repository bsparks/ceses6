'use strict';

import System from '../../ces/system';

class SomeSystem extends System {
    test = 0;

    update(dt) {
        super.update(dt);

        this.test++;
    }
}

export default SomeSystem;