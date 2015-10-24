'use strict';

class Serializable {
    constructor(props) {
        this._serializeWhiteList = new Set();
        for (let key in props) {
            this[key] = props[key];
            this._serializeWhiteList.add(key);
        }
    }

    serializeAble(prop) {
        this._serializeWhiteList.add(prop);
    }

    toJSON() {
        let copy = Object.assign({}, this);
        return JSON.stringify(copy, Array.from(this._serializeWhiteList));
    }
}

export default Serializable;