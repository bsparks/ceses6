'use strict';

import 'preloadjs';

var preload = new createjs.LoadQueue(true);
var assets = [
    {id: 'crateModel', src: '/app/assets/crate_mesh.obj', type: createjs.AbstractLoader.TEXT},
    {id: 'crateMaterial', src: '/app/assets/crate_diff.png'}
];
preload.loadManifest(assets);

export {preload}