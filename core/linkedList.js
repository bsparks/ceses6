'use strict';

class Node {
    constructor(data) {
        this.prev = this.next = null;
        this.data = data;
    }
}

class List {
    constructor() {
        this.head = this.tail = null;
        this.size = 0;
    }

    addNode(node) {
        if (this.head === null) {
            this.head = this.tail = node;
        } else {
            node.prev = this.tail;
            this.tail.next = node;
            this.tail = node;
        }

        this.size++;
    }

    add(obj) {
        let node = new Node(obj);

        this.addNode(node);

        return node;
    }

    findNode(obj, eqFn = ((a, b) => a === b)) {
        for (let node of this.nodes()) {
            if (eqFn(node.data, obj)) {
                return node;
            }
        }

        return null;
    }

    has(obj, eqFn = ((a, b) => a === b)) {
        return !!this.findNode(obj, eqFn);
    }

    findWhere(obj) {
        var data = [];

        this.forEach(item => {
            for (let key in obj) {
                if (item.hasOwnProperty(key) && item[key] === obj[key]) {
                    data.push(item);
                }
            }
        });

        return data;
    }

    remove(obj, eqFn = ((a, b) => a === b)) {
        this.removeNode(this.findNode(obj, eqFn));
    }

    removeNode(node) {
        if (!node) {
            return;
        }

        if (node.prev === null) {
            this.head = node.next;
        } else {
            node.prev.next = node.next;
        }

        if (node.next === null) {
            this.tail = node.prev;
        } else {
            node.next.prev = node.prev;
        }

        this.size--;
    }

    clear() {
        this.head = this.tail = null;
        this.size = 0;
    }

    isEmpty() {
        return this.size === 0;
    }

    toArray() {
        return Array.from(this);
    }

    forEach(callback, reversed = false) {
        for (let node of this.nodes(reversed)) {
            if (callback(node.data) === false) {
                break;
            }
        }
    }

    *nodes(reversed = false) {
        var node = reversed ? this.tail : this.head;
        while (node) {
            yield node;
            node = reversed ? node.prev : node.next;
        }
    }

    get values() {
        return this.toArray();
    }

    *[Symbol.iterator]() {
        var node = this.head;
        while (node) {
            yield node.data;
            node = node.next;
        }
    }
}

export var LinkedListNode = Node;
export var LinkedList = List;