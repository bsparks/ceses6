'use strict';

import World from '../ces/world';
import SomeSystem from './game/something';
import Component from '../ces/component';
import {LinkedList} from '../core/linkedList';
import timing from './timing';
import Entity from '../ces/entity';

var test = window.test = new LinkedList();
test.add({a:1,b:2});
test.add({b:33,c:'dong'});

window.foo = new Component({ test: 'abc', bar: 1, twingle: [1, 2, 3] });

var world = window.world = new World();
world.addSystem(new SomeSystem());

world.entities.add(new Entity());
world.entities.add(new Entity());

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