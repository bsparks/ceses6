'use strict';

import Component from '../ces/component';
import {LinkedList} from '../core/linkedList';

var test = window.test = new LinkedList();
test.add({a:1,b:2});
test.add({b:33,c:'dong'});

window.foo = new Component({ test: 'abc', bar: 1, twingle: [1, 2, 3] });