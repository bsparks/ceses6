'use strict';

import World from '../ces/world';
import SomeSystem from './game/something';
import Component from '../ces/component';
import {LinkedList} from '../core/linkedList';
import timing from './timing';
import Entity from '../ces/entity';

var test = window.test = new LinkedList();
test.add({ a: 1, b: 2 });
test.add({ b: 33, c: 'dong' });

window.foo = new Component({ test: 'abc', bar: 1, twingle: [1, 2, 3] });

var world = window.world = new World();
world.addSystem(new SomeSystem());

var e1 = new Entity();
e1.addComponent('position', {x: 1, y: 0, z: 0});
var e2 = new Entity();
e2.addComponent('position', {x: 0, y: 23, z: 387});
var e3 = new Entity();
e3.addComponent('ghostId', {id: 'blah'});

world.addEntities(e1, e2, e3);

var last = 0;
function loop() {
    requestAnimationFrame(loop);

    let current = performance.now();
    let delta = current - last;

    timing.elapsed += delta;
    timing.frameTime = delta;

    last = current;

    world.update(delta);
}

loop();