define([
	"scripts/classes/loading/LoadingStep.js"
], (LoadingStep) =>
	class WorkerProcessor extends LoadingStep {
		constructor() {
			super();
		}
		load() {
			console.log("WorkerProcessor started");
			// Simulate a Load
			return new Promise((resolve) => {
				this.progress = 1/5;
				setTimeout(()=>(this.progress = 2/5), 1000);
				setTimeout(()=>(this.progress = 3/5), 2000);
				setTimeout(()=>(this.progress = 4/5), 3000);
				setTimeout(()=>(this.progress = 5/5), 4000);
				setTimeout(()=>{
					console.log("WorkerProcessor done");
					resolve();
				}, 5000);
			})
		}
	}
);