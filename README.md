# Loading System for Web-Apps

This is a javascript object-oriented, loading system based on ES6 Promises that aims to help quick-start web applications that need a loading bar at some point on your application.

## Usage

Say you have a class that needs to do some heavy processing / assync calls, you define it like so:

````js
class DataRetriever extends LoadingStep {
	constructor() {
		super();
		this.dataNames = ["data1", "data2"]; // Some random constants
	}
	getData() { // Used by your application to retrieve data after it was done
		if (!this.loaded) {
			throw new Error("Data requested before being ready!");
		}
		return this.data;
	}
	async load() { // SHOULD:  (return a promise)  or  (be async)
		let loaded;
		var fetchLoad = async (response) => {
			loaded ++;
			this.progress = loaded/this.dataNames.length;
			// Useful if your step has sub-steps!
			// If these sub-steps inherit LoadingStep then there's no need to do that!
			return await response.text();
		};
		var dataPromises = this.dataNames.map(name => fetch("/pull.php?u="+name).then(fetchLoad));
		await Promise.all(dataPromises);
		// Here we implicitly resolve because the function ends
	}
}
````

Then, you include that new class in the LoadingSystem's constructor to be loaded:

````js
class LoadingSystem {
	constructor() {
		this.steps = [{
				name: "Initializing loading system",
				// This must be the first thing to load, it's the progress bar controller!
				objects: [ LoadingView ]
			}, {
				name: "Retrieving server files and processing stuff",
				objects: [ new Foo(), new DataRetriever() ]
				// Your class was added in the line above
				// It is in an array because we allow Foo to run in parallel with it
			}, {
				name: "Finishing loading process",
				objects: [ new FinishLoading() ]
			}
		]
	}
````

Your application that controls the loading system could also call `loadingStep.addStep(DataRetriever, 1)` instead of editing its constructor, if you prefer. That is especially useful if your application has more than a single LoadingSystem (which should be your default assumption... unless you plan on doing (It-Which-Must-Not-Be-Named](https://en.wikipedia.org/wiki/Singleton_pattern) )

Anyways, we're almost done, create a new `LoadingSystem()` and call the async `.load()` method that the loading will progressed automatically.

Now we're done.

## How does it progress?

When you set `this.progress = ?`, your function will progress the loading bar automatically. This is because the `this.progress` setter is a function that emits an event that handles these calculations.

If you didn't set this property, it will be treated as a single step, and the LoadingSystem class will automatically set it to 1, representing 100%;

## Reading LoadingStep's:

This is the piece of code that reads all the LoadingSteps:

````js
	... 
	async load() {

		function getPromisesFromSteps(mixed) {
			if (mixed instanceof Object) {
				mixed = [mixed];
			}
			return mixed.map(step=>step.load());
		}

		function makeSureProgressIsDone(step) {
			return (step.progress !== 1) && (step.progress = 1);
		}

		for (let i = 0 ; i < this.steps.length ; i++) {
			var promises = getPromisesFromSteps(this.steps[i]);
			await Promise.all(promises);
			if (this.steps[i] instanceof Object) {
				makeSureProgressIsDone(this.steps[i]);
			} else {
				this.steps[i].map(makeSureProgressIsDone);
			}
		}
	}
}
````

# Demo

[Click here](https://rawgit.com/GuilhermeRossato/loading-system-app/master/index.html) to view this repository demo. It's a simple static page.

This Loading System is used in my javascript experiment to simulate minecraft's redstone logic in a similar 3D environment. [Click here to visit its github page](https://github.com/GuilhermeRossato/3D-Redstone-Simulator/), or [click here to run its web app](https://rawgit.com/GuilhermeRossato/3D-Redstone-Simulator/master/index.html).

# Releases

 - v 0.5 []

# How to run this repo locally

Clone to your workspace with
````sh
git clone https://github.com/GuilhermeRossato/loading-system-app.git
````

Then run index.php with your browser
````sh
xdg-open ./loading-system-app/index.php
````

# Dependencies, Credits and Inspiration

1. [Guilherme Rossato](https://github.com/GuilhermeRossato/) - That's me, the creator of this tool
2. [RequireJs](https://github.com/requirejs/requirejs) - Used to handle async dependencies

# Final considerations

This software is provided 'as is', without any kind of warranty. RequireJS might have its own license and their terms may differ from mine.

If this project saves you some hours of work, well, good for you, we're alike in that aspect.