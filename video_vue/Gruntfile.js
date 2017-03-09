// Generated on 2015-02-04 using generator-angular 0.11.0
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {

    // Load grunt tasks automatically
    // require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    // require('time-grunt')(grunt);
    // 

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-filerev');
    grunt.loadNpmTasks('grunt-usemin');

    // Configurable paths for the application
    var appConfig = {
        app: '.',
        dist: './dist'
    };

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        ytApp: appConfig,
        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= ytApp.dist %>/{,*/}*',
                        '!<%= ytApp.dist %>/.git{,*/}*'
                    ]
                }]
            },
            distViews: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= ytApp.dist %>/views'
                    ]
                }]
            },
            server: '.tmp'
        },
        // Renames files for browser caching purposes
        filerev: {
            dist: {
                src: [
                    '<%= ytApp.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                    '<%= ytApp.dist %>/scripts/*.js',
                    '<%= ytApp.dist %>/styles/{,*/}*.css'
                ]
            }
        },
        usemin: {
            html: ['<%= ytApp.dist %>/views/{,*/}*.html'],
            css: ['<%= ytApp.dist %>/styles/{,*/}*.css'],
            js: ['<%= ytApp.dist %>/scripts/{,*/}*.js'],
            options: {
                assetsDirs: [
                    '<%= ytApp.dist %>/images',
                    '<%= ytApp.dist %>/styles',
                    '<%= ytApp.dist %>/scripts',
                ],
                patterns: {
                    js: [
                        [/(\.*\/.*\.(png|jpg|jpeg|gif|webp|svg))/]
                    ]
                }
            }
        },


        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= ytApp.app %>',
                    dest: '<%= ytApp.dist %>',
                    src: [
                        'images/**',
                        'scripts/**',
                        'styles/**',
                        'views/**'
                    ]
                }]
            },
            styles: {
                expand: true,
                cwd: '<%= ytApp.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }
        }


    });



    grunt.registerTask('default', [
        'clean:dist',
        'copy:dist',
        'filerev',
        'usemin'
    ]);
};