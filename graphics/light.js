'use strict';

import THREE from 'three';
import {Component, System} from '../ces/ces';

const LIGHT_TYPES = ['PointLight', 'DirectionalLight', 'SpotLight', 'AmbientLight', 'HemisphereLight'];

class LightComponent extends Component {
	constructor(params) {
		let defaults = {
			lightType: 'PointLight'
		};

		super(Object.assign(defaults, params));
	}
}

class LightSystem extends System {
	addedToWorld(world) {
		super.addedToWorld(world);

		world.onEntityAdded('light').add(function (entity) {
			if (!entity.components.has('sceneObject')) {
				let obj = new THREE.Object3D();
				entity.addComponent('sceneObject', { obj: obj });
			}

			let sceneObject = entity.getComponent('sceneObject').obj;
			let lightData = entity.getComponent('light');

			if (LIGHT_TYPES.indexOf(lightData.lightType) < 0) {
				console.log('invalid light type: ', lightData.lightType, lightData);
				return;
			}

			let light = null;
			switch (lightData.lightType) {
				case 'DirectionalLight':
					light = new THREE.DirectionalLight(lightData.color, lightData.intensity);
				case 'PointLight':
					light = new THREE.PointLight(lightData.color, lightData.intensity, lightData.distance);
					break;
				case 'SpotLight':
					light = new THREE.SpotLight(lightData.color, lightData.intensity, lightData.distance, lightData.angle, lightData.exponent);
					break;
				case 'AmbientLight':
					light = new THREE.AmbientLight(lightData.color);
					break;
				case 'HemisphereLight':
					light = new THREE.HemisphereLight(lightData.skyColor, lightData.groundColor, lightData.intensity);
					break;

			}

			lightData._light = light;

			if (light) {
				sceneObject.add(light);
			}
		});
		
		world.onEntityRemoved('light').add(function(entity) {
			
		});
	}
}

export LightComponent;