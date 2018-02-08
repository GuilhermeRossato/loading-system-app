define([], {
	load: async function() {
		this.content = document.querySelector(".content");
		this.title = this.content.querySelector(".title");
		this.description = this.content.querySelector(".description .text");
		this.percentageLabel = this.content.querySelector(".description .percentage");
		this.percentageBar = this.content.querySelector(".bar .progress");
		this.progress = 1;
	},
	setProgress: function(p) {
		if (this.progress === 1) {
			this.percentageBar.style.width = (101*p).toFixed(2)+"%";
			this.percentageLabel.innerText = (100*p).toFixed(0)+"%";
		} else {
			throw new Error("Using view before its loading is forbidden!");
		}
	},
	setDescriptionText: function(text) {
		this.description.innerText = text;
	},
	open: function () {
		console.log("Loading View Started");
	},
	close: function () {
		console.log("Loading View Closed");
	}
});