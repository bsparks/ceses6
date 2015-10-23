'use strict';

import EntityList from './entityList';
import Entity from './entity';
import Signal from '../core/signal';

class Family {
    constructor(...traits) {
        this._anyOfComponents = [];
        this._allOfComponents = [];
        this._noneOfComponents = [];

        this.entities = new EntityList();

        this.assignTaxonomy(traits);

        this.onAddEntity = new Signal();
        this.onRemoveEntity = new Signal();
    }

    assignTaxonomy(traits) {
        // TODO: something if trying to change this after it's filled?
        this._allOfComponents = traits.filter(name => (name.substr(0, 1) !== '!' && name.substr(0, 1) !== '?'));

        this._noneOfComponents = traits
            .filter(name => name.substr(0, 1) === '!')
            .map(name => name.substr(1));

        this._anyOfComponents = traits
            .filter(name => name.substr(0, 1) === '?')
            .map(name => name.substr(1));
    }

    addEntity(entity) {
        return this._checkEntity(entity);
    }

    removeEntity(entity) {
        return this._removeEntity(entity);
    }

    _addEntity(entity) {
        if (!this.entities.has(entity)) {
            this.entities.add(entity);
            this.onAddEntity.post(entity);

            return true;
        }

        return false;
    }

    _removeEntity(entity) {
        if (this.entities.has(entity)) {
            this.entities.remove(entity);
            this.onRemoveEntity.post(entity);

            return true;
        }

        return false;
    }

    forEach(callback, reversed = false) {
        this.entities.forEach(callback, reversed);
    }

    _checkEntity(entity, components) {
        var contains = this.entities.has(entity),
            interested = true;

        components = components || entity.getComponentNames();

        if (this._allOfComponents.length > 0) {
            interested = this._allOfComponents.every(function (component) {
                return components.indexOf(component) >= 0;
            });
        }

        if (this._noneOfComponents.length > 0 && interested) {
            interested = this._noneOfComponents.every(function (component) {
                return components.indexOf(component) < 0;
            });
        }

        if (this._anyOfComponents.length > 0 && interested) {
            interested = this._anyOfComponents.some(function (component) {
                return components.indexOf(component) >= 0;
            });
        }

        if (contains && !interested) {
            this._removeEntity(entity);
        } else if (!contains && interested) {
            this._addEntity(entity);
        }

        return interested;
    }
}

export default Family;