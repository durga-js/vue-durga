'use strict';

const ComponentInstance = require('./lib/component-instance');

function installDurgaPlugin(Vue) {

	Vue.mixin({

		data() {
			return {
				topics: {
					ready: false
				}
			};
		},

		beforeCreate() {

			if(this.$root.$options.durga) {

				let $durga = this.$root.$options.durga;

				if(this === this.$root) {
					this.$durga = $durga;

				} else {
					this.$durga = new ComponentInstance($durga, this);
				}
			}

		},

		created() {
			if(this === this.$root && this.$durga) {
				//this.$durga.connect({ vm: this });
			}
		},

		destroyed() {
			if(this.$durga) {
				this.$durga._destroy();
			}
		},

	});

}




module.exports = {
	install: installDurgaPlugin
};
