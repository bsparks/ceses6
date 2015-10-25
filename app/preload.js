'use strict';

import 'preloadjs';

var promise = new Promise(function(resolve, reject) {
    var preload = new createjs.LoadQueue(true);
    var assets = [
        {id: 'crateModel', src: '/app/assets/crate_mesh.obj', type: createjs.AbstractLoader.TEXT},
        {id: 'crateMaterial', src: '/app/assets/crate_diff.png'}
    ];
    preload.on('complete', function() {
        resolve(preload);
    });
    preload.loadManifest(assets);
});

async function preloadAssets() {
    let cache = await promise;
    console.log('assets loaded...', cache);
    return cache;
}

export var assetCache = preloadAssets();