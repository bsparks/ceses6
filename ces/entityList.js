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
	
	has(entity) {
		return this._entities.has(entity.id);
	}
}

export default EntityList;