'use strict';

import {LinkedList} from './linkedList';

class Signal {
    constructor() {
        this.listeners = new LinkedList();
    }

    post(...params) {
        for (let listener of this.listeners) {
            listener.apply(this, params);
        }
    }
    
    add(listener) {
        this.listeners.add(listener);
    }

    remove(listener) {
        this.listeners.remove(listener);
    }

    clear() {
        this.listeners.clear();
    }
}

export default Signal;