'use strict';

import {LinkedList} from '../core/linkedList';

class EntityList extends LinkedList {
    constructor() {
        super();
        this._entities = new Map();
    }

    add(entity) {
        var node = super.add(entity);
        this._entities.set(entity.id, node);

        return node;
    }

    remove(entity) {
        var node = this._entities.get(entity.id);
        if (node) {
            this.removeNode(node);
        }
    }

    removeNode(node) {
        super.removeNode(node);
        this._entities.delete(node.data.id);
    }

    has(entity) {
        return this._entities.has(entity.id);
    }

    clear() {
        super.clear();
        this._entities.clear();
    }
}

export default EntityList;