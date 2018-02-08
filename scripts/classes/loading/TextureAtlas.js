define([
	"scripts/classes/loading/LoadingStep.js",
	"scripts/classes/loading/ImageLoader.js"
], (LoadingStep, ImageLoader, BlockData) =>
	class TextureAtlas extends LoadingStep {
		constructor() {
			super();
			this.fileNames = TextureAtlas.getAllUsedImages();
			this.images = this.fileNames.map(fileName => new ImageLoader(fileName));
		}
		static getAllUsedImages() {
			return ["images/project_image1.png", 'images/project_image2.png'];
		}
		load() {
			var promises = Promise.all(this.images.map(image => image.load()));
			// Since ImageLoader
			this.progress = 1;
			return promises;
		}
	}
);