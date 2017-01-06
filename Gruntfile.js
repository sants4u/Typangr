module.exports = function(grunt) {
	// Do grunt-related things in here.

	// Project configuration.
	grunt.initConfig({

		clean: ["build"],
		copy: {
			dev: {
                files: [{
                    expand: true,
                    src: [
                        'assets/css/**', 'assets/images/**', 'assets/libs/*.js',
                        '!**/build/**',
                        'assets/libs/jquery.globalize/*.js',
                        'assets/libs/jquery.globalize/cultures/globalize.culture.en-US.js'],
                    dest: 'build/'
                }]
            }
		},
		injector: {
            options: {
                template: 'index.html',
                addRootSlash: false
            },
            dev: {
                // The order of the files below determines the order they are loaded during runtime
                files: {
                    'build/index.html': [
                        // third party libs first
                        'build/assets/libs/jquery-214.min.js',
                        'build/assets/libs/bootstrap-311.min.js',
                        'build/assets/libs/angular-158.min.js',
                        'build/assets/libs/jquery.globalize/*.js',
                        'build/assets/js/*.js',
                        // custom JS
                        'build/src/**/*.js',
                        // all CSS
                        'build/assets/css/*.css']
                }
            }
        },
        connect: {
            dev: {
                options: {
                    port: 9090,
                    base: 'build',
                    open: 'http://localhost:8090/index.html',
                }
            },
            alive: {
                options: {
                    keepalive: true,
                    port: 9090,
                    base: 'build',
                    open: 'http://localhost:8090/index.html',
                }
            }
        }
	});

	// Load the plugin that provides the tasks.
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-injector');
	grunt.loadNpmTasks('grunt-contrib-connect');

	// Regitster tasks.
	grunt.registerTask('build', ['clean', 'copy:dev', 'injector:dev'])
	// Default task(s).
	grunt.registerTask('default', ['build', 'connect:alive']);
}