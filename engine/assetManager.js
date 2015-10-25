'use strict';

import 'preloadjs';
import {OBJLoaderPlugin} from './modelLoaderPlugin';

var createjs = window.createjs;

class AssetManager {
    constructor() {
        this.manifest = [];
    }

    async _preload() {
        var loader = await new Promise(resolve => {
            let queue = new createjs.LoadQueue(true);
            queue.installPlugin(new OBJLoaderPlugin());
            queue.on('complete', function() {
                resolve(queue);
            });
            queue.loadManifest(this.manifest);
        });

        return loader;
    }

    async load() {
        var assets = await this._preload();

        return assets;
    }
}

export default AssetManager;