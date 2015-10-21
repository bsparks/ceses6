'use strict';

import {enumerable} from '../core/decorators/enumerable';

class System {
    constructor() {
        this._active = true;
    }

    update(dt) {
        if (!this._active) {
            return;
        }
    }

    active = true;
}

export default System;