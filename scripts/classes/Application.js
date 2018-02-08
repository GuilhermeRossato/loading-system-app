define([
	"scripts/classes/loading/LoadingSystem.js"
], (LoadingSystem) =>
class Application {
	constructor() {
		this.loader = new LoadingSystem();
		this.init();
	}
	async init() {
		try {
			await this.loader.load();
			console.log("Loading has finished!");
		} catch (err) {
			console.log("Something went wrong while loading:");
			console.error(err);
		}
	}
});
