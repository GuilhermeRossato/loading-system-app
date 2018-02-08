define([
	"scripts/classes/loading/LoadingStep.js"
], (LoadingStep) =>
class FinishLoading extends LoadingStep {
	constructor() {
		super();
	}
	async load() {
		document.querySelector(".title").innerText = "Done!";
		document.querySelector(".description > .text").innerText = "Complements from FinishLoading.js";
		this.progress = 1;
	}
});
