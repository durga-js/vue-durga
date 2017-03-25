'use strict';


module.exports = class DurgaComponentInstance {
	constructor(durga, component) {
		this.$rootDurga = durga;
		this._subs = {};

		// subscribe to topics
		if(component.$options.topics && Array.isArray(component.$options.topics)) {
			component.$options.topics.forEach(topic => {

				this.subscribe(topic, null, (err, res) => {
					console.log('ready!');
				});

			});
		}

		this.info = {};
	}

	subscribe(topic, payload) {

		let sub = this.$rootDurga.subscribe(topic, payload);

		this._subs[sub.$id] = sub;

		return sub.ready;
	}

	emit() {
		return this.$rootDurga.emit(...arguments);
	}

	exec() {
		return this.$rootDurga.exec(...arguments);
	}

	get vuex() {
		return this.$rootDurga.vuex;
	}

	_destroy() {
		Object.keys(this._subs)
			.forEach(topic => this._subs[topic].dispose());
	}
};
