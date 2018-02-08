define([
	"scripts/classes/loading/LoadingStep.js"
], (LoadingStep) =>
class DataRetriever extends LoadingStep {
	constructor() {
		super();
		this.dataNames = ["data1", "data2"];
	}
	getData() {
		if (!this.loaded) {
			throw new Error("Data requested before being ready!");
		}
		return this.data;
	}
	async load() {
		let loaded;
		var fetchLoad = async (response) => {
			loaded ++;
			this.progress = loaded/this.dataNames.length;
			return await response.text();
		};
		//var dataPromises = this.dataNames.map(name => fetch("/index.html?u="+name).then(fetchLoad));
		var dataPromises = this.dataNames.map(name => new Promise(r => setTimeout(r, 1000)));
		await Promise.all(dataPromises);
		this.progress = 1;
	}
});
