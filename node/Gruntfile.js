module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		apidoc: {
			apidoc: {
				src: "routes/",
				dest: "apidoc/"
			}
		},
		jsdoc: {
			dist: {
				src: ["db/**/*.js", "client/modules/**/*.js", "models/**/*.js", "lib/**/*.js"],
				options: {
					destination: "jsdoc"
				}
			}
		},
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks("grunt-apidoc");
	grunt.loadNpmTasks("grunt-jsdoc");

	// Default task(s).
	grunt.registerTask("default", ["apidoc", "jsdoc"]);

};