'use strict';

module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        compass: {
            dev: {
                options: {
                    cssDir: ['src/css'],
                    sassDir: ['src/scss'],
                    sourcemap: true,
                }
            },
            build: {
                options: {
                    cssDir: ['<%= pkg.folders.app %>css'],
                    sassDir: ['<%= pkg.folders.app %>src/scss'],
                    quiet: true,
                    outputStyle: 'compressed',
                    noLineComments: true
                }
            }
        },
        html2js: {
            options: {
                base: 'src/js/app'
            },
            gabor: {
                src: ['src/js/app/views/**/*.html'],
                dest: 'src/js/app/templates.js'
            }
        },
        watch: {
            compass: {
                files: ['src/**/*.scss'],
                tasks: ['compass:dev'],
                options: {
                    livereload: true,
                },
            },
            html: {
                files: ['src/**/*.html', 'index.html'],
                tasks: ['html2js'],
                options: {
                    livereload: true,
                },
            },
            js: {
                files: ['src/**/*.js'],
                tasks: [],
                options: {
                    livereload: true,
                },
            }
        },
        connect: {
            livereload: true,
            server: {
                options: {
                    port: 3000,
                    hostname: '*',
                    base: ''
                }
            },
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'src/**/*.js', 
                '!src/js/app/templates.js',
                '!src/js/bower_components/**/*',
                '*.js', 
            ]
        }
    });
    grunt.registerTask('build', [
        'compass:build',
    ]);
    grunt.registerTask('dev', [
        'jshint',
        'html2js',
        'compass:dev',
        'connect:server',
        'connect:livereload',
        'watch',
    ]);
    grunt.registerTask('default', [
        'dev'
    ]);
};