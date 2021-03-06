module.exports = function(grunt) {

	grunt.initConfig({

		// Import package manifest
		pkg: grunt.file.readJSON("validate-nicely.jquery.json"),

		// Banner definitions
		meta: {
			banner: "/*\n" +
				" *  <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n" +
				" *  <%= pkg.description %>\n" +
				" *  <%= pkg.homepage %>\n" +
				" *\n" +
				" *  Made by <%= pkg.author.name %>\n" +
				" *  Under <%= pkg.licenses[0].type %> License\n" +
				" */\n"
		},

		// Concat definitions
		concat: {
			dist: {
				src: ["src/jquery.validate-nicely.js"],
				dest: "dist/jquery.validate-nicely-<%= pkg.version %>.js"
			},
			options: {
				banner: "<%= meta.banner %>"
			}
		},

		// Lint definitions
		jshint: {
			files: ["src/jquery.validate-nicely.js"],
			options: {
				jshintrc: ".jshintrc"
			}
		},

		// Minify definitions
		uglify: {
			my_target: {
				src: ["src/jquery.validate-nicely.js"],
				dest: "dist/jquery.validate-nicely-<%= pkg.version %>.min.js"
			},
			options: {
				banner: "<%= meta.banner %>"
			}
		},

		// CoffeeScript compilation
		coffee: {
			compile: {
				files: {
					"dist/jquery.file.js": "src/jquery.file.coffee"
				}
			}
		},

        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },

		// watch for changes to source
		// Better than calling grunt a million times
		// (call 'grunt watch')
		watch: {
		    files: ['src/*'],
		    tasks: ['default']
		}

	});

	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-coffee");
	grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks('grunt-karma');

	grunt.registerTask("default", ["jshint", "concat", "uglify"]);
	grunt.registerTask("test", ["karma"]);
	grunt.registerTask("travis", ["jshint"]);

};
