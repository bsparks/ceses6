'use strict';

import world from './world';
import scene from './rootScene';
import camera from './mainCamera';
import renderer from './renderer';
import timing from './timing';

var last = 0;

export default function loop() {
    requestAnimationFrame(loop);

    let current = performance.now();
    let delta = current - last;

    timing.elapsed += delta;
    timing.frameTime = delta;

    last = current;

    world.update(delta);

    renderer.render(scene, camera);
}