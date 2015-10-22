'use strict';

var ENTITY_ID = 0;

class Entity {
    constructor() {
       this.id = ++ENTITY_ID; 
    }
}

export default Entity;