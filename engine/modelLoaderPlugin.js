'use strict';

import THREE from 'three';
import './objLoader';

var meshCache = new Map();

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
        loadItem.completeHandler = this.onComplete.bind(this);

        return true;
    }

    onComplete(event) {
        console.log('completed: ', event);
        let parsed = objLoader.parse(event.result);
        meshCache.set(event.item.src, parsed);
    }
}

export {OBJLoaderPlugin, meshCache as MeshCache};