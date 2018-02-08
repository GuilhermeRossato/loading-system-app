define([
	"Scripts/Classes/Settings/FloatSetting.js",
	"Scripts/Classes/Settings/StringSetting.js"
],(FloatSetting, StringSetting)=>({
	something: new FloatSetting({min: 10, max: 50, value: 50}),
	page: {
		title: new StringSetting("Page Title in Configuration.js")
	}
}));