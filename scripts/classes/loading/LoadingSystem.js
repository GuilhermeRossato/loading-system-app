define([
	"scripts/classes/loading/LoadingStep.js",
	"scripts/views/LoadingView.js",
	"scripts/classes/loading/TextureAtlas.js",
	"scripts/classes/loading/WorkerProcessor.js",
	"scripts/classes/loading/DataRetriever.js",
	"scripts/classes/loading/FinishLoading.js",
], function (LoadingStep, LoadingView, TextureAtlas, WorkerProcessor, DataRetriever, FinishLoading) {
	return class LoadingSystem {
		constructor() {
			this.steps = [{
				objects: [ LoadingView ]
			}, {
				name: "Loading images and generating the world",
				objects: [ new TextureAtlas() ]
			}, {
				name: "Retrieving server files and processing stuff",
				objects: [ new WorkerProcessor(), new DataRetriever() ]
			}, {
				name: "Finishing loading process",
				objects: [ new FinishLoading() ]
			}];
			LoadingStep.on("progress-update", this.updateProgress.bind(this));
		}
		addPhase(instances, name) {
			this.steps.push({
				name: name,
				objects: instances
			});
		}
		addStep(instance, index) {
			if (index >= this.steps.length) {
				index = this.steps.length-1;
			}
			if (index >= 0) {
				this.steps[index].objects.push(instance);
			}
		}
		updateProgress(instance) {
			var progress = LoadingStep.getOverallProgress();
			LoadingView.setProgress(progress);
			return progress;
		}
		async load() {
			function getPromisesFromSteps(list) {
				return list.objects.map(step=>step.load());
			}

			function makeSureProgressIsDone(step) {
				return (step.progress === 1) || (step.progress = 1);
			}

			for (let i = 0 ; i < this.steps.length ; i++) {
				if (typeof this.steps[i].name === "string") {
					LoadingView.setDescriptionText(this.steps[i].name);
				}
				var promises = getPromisesFromSteps(this.steps[i]);
				await Promise.all(promises); //await new Promise(r=>setTimeout(r, 1000));
				console.log("Stage", i, "complete");
				if (!this.steps[i].objects.every(makeSureProgressIsDone)) {
					// This is a very unexpected error
					throw new Error("Could not make sure loading phase",i,"was properly loaded");
				}
			}
		}
	}
});