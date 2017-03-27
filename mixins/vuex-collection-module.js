'use strict';


module.exports = function durgaCRUDActions(vm, collectionName, vuexModule) {

	let collection = vm.$durga.collection(collectionName);

	collection
		.subscribe(e => {

			if(e.type === 'added') {
				vm.$store.commit(vuexModule+'/$assign', e.model);
			} else if(e.type === 'updated') {
				vm.$store.commit(vuexModule+'/$assign', e.model);
			} else if(e.type === 'destroyed') {
				vm.$store.commit(vuexModule+'/$remove', { id: e.id });
			}

		});

	return {
		$get({ commit, getters }, id) {
			return collection.get(id)
				.then(res => commit('$assign', res));
		},
		$create({ commit }, model) {
			return collection.create(model)
				.then(res => commit('$assign', res));
		},
		$update({ commit }, model) {
			return collection.update(model.id, model)
				.then(res => commit('$assign', res));
		},
		$destroy({ commit }, model) {
			return collection.destroy(model.id)
				.then(() => commit('$remove', model));
		}
	};
};
