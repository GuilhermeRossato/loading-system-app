define([
	"scripts/classes/loading/LoadingStep.js"
], (LoadingStep) =>
class ImageLoader extends LoadingStep {
	constructor(imageUrl) {
		super();
		this.imageUrl = imageUrl;
		this.image = new Image();
	}
	finish(callback) {
		console.log("Image loaded");
		this.progress = 1;
		callback();
	}
	load() {
		return new Promise((resolve, reject) => {
			this.image.onload = ()=>{
				this.finish(resolve);
			}
			this.image.onerror = () => {
				this.finish(reject);
			}
			try {
				this.image.src = this.imageUrl;
			} catch (err) {
				this.finish(reject);
			}
		});
	}
});
