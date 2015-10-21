'use strict';

export function enumerable(isEnumerable = true) {
    return function (target, name, descriptor) {
        console.log('decorating: ', target, name, descriptor);
        descriptor.enumerable = isEnumerable;
        return descriptor;
    }
}