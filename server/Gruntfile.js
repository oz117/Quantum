/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Gruntfile.js                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: paulos_a <paulos_a@epitech.eu>             +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2016/03/18 12:08:52 by paulos_a          #+#    #+#             */
/*   Updated: 2016/03/18 12:08:52 by paulos_a         ###   ########          */
/*                                                                            */
/* ************************************************************************** */

module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concurrent: {
			dev: {
				tasks: ['nodemon', 'watch'],
				options: {
					logConcurrentOutput: true
				}
			}
		},
		nodemon: {
			dev: {
				script: 'app.js',
				options: {
					ignore: [
						'node_modules/**',
					],
					ext: 'js'
				}
			}
		},
		watch: {
			serverJS: {
				files: ['api/**/*.js'],
				tasks: ['newer:jshint:server']
			}
		},
		jshint: {
			server: {
				options: {
					jshintrc: '.jshintrc'
				},
				src: [
					'models/*.js',
					'api/**/*.js'
				]
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-newer');
	grunt.registerTask('default', ['concurrent']);
	grunt.registerTask('lint', ['jshint']);
};
