'use strict';

import EntityList from './entityList';
import Family from './family';

class World {
    constructor() {
        this.systems = [];
        this.families = new Map();
        this.entities = new EntityList();
    }

    addSystem(system) {
        this.systems.push(system);
        system.addedToWorld(this);
    }

    addEntity(entity) {
        this.entities.add(entity);

        this.updateFamilies(entity);

        entity.onComponentAdded.add(() => this.updateFamilies(entity));
        entity.onComponentRemoved.add(() => this.updateFamilies(entity));
    }

    removeEntity(entity) {
        this.entities.remove(entity);
        entity.destroy();

        for(let family of this.families.values()) {
            family.removeEntity(entity);
        }
    }

    addEntities(...entities) {
        for (let entity of entities) {
            this.addEntity(entity);
        }
    }

    updateFamilies(entity) {
        for (let family of this.families.values()) {
            // addEntity of family will actually remove or add as needed
            family.addEntity(entity);
        }
    }

    getFamily(...traits) {
        let familyId = Family.getId(traits);
        if (!this.families.has(familyId)) {
            let family = new Family(...traits);
            for (let entity of this.entities) {
                family.addEntity(entity);
            }
            this.families.set(familyId, family);

            return family;
        }

        return this.families.get(familyId);
    }

    onEntityAdded(...traits) {
        let family = this.getFamily(...traits);

        return family.onAddEntity;
    }

    onEntityRemoved(...traits) {
        let family = this.getFamily(...traits);

        return family.onRemoveEntity;
    }

    update(dt) {
        this.systems.forEach(system => system.update(dt));
    }
}

export default World;