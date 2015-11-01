'use strict';

import THREE from 'three';
import './objLoader';
import meshCache from './meshCache';

var objCache = new Map();
var objLoader = new THREE.OBJLoader();

class OBJLoaderPlugin {
    getPreloadHandlers() {
        return {
            callback: this.preloadHandler.bind(this),
            extensions: ['obj']
        };
    }

    preloadHandler(loadItem, queue) {
        console.log('obj loader plugin', loadItem);
        // TODO: test cache
        loadItem.type = 'text';
        loadItem.completeHandler = this.onComplete.bind(this);

        return true;
    }

    onComplete(event) {
        console.log('completed: ', event);
        let parsed = objLoader.parse(event.result);
        objCache.set(event.item.src, parsed);
        meshCache.set(event.item.id, parsed);
    }
}

export {OBJLoaderPlugin, objCache};