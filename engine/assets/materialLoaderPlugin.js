'use strict';

import THREE from 'three';
import materialCache from './materialCache';

var textureCache = new Map();

class MaterialLoaderPlugin {
    getPreloadHandlers() {
        return {
            callback: this.preloadHandler.bind(this),
            types: ['material']
        };
    }

    preloadHandler(loadItem, queue) {
        console.log('material loader plugin', loadItem);
        // TODO: test cache
        loadItem.completeHandler = this.onComplete.bind(this);

        var loader = new createjs.ImageLoader(loadItem);

        return loader;
    }

    onComplete(event) {
        console.log('mat loader completed: ', event);

        var texture = new THREE.Texture(event.result, THREE.UVMapping);
        texture.needsUpdate = true;
        var material = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            specular: 0x000000,
            opacity: 0.4,
            transparent: false,
            map: texture,
            shading: THREE.SmoothShading
        });
        material.needsUpdate = true;

        textureCache.set(event.item.src, texture);
        materialCache.set(event.item.id, material);
    }
}

export {MaterialLoaderPlugin, textureCache};