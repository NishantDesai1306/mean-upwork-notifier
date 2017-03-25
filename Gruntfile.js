module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-include-source');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-express');
    grunt.loadNpmTasks('grunt-angular-file-loader');
    grunt.loadNpmTasks('grunt-html2js');

    grunt.initConfig({
        appConfig: {
            scripts: [
                'app/**/*.js'
            ],
            styles: [
                'app/pages/**/*.css'
            ]
        },
        watch: {
            options: {
                livereload: true
            },
            js: {
                files: [
                    'app/**/*.js',
                ],
                tasks: ['default']
            },
            css: {
                files: [
                    'app/**/*.css'
                ],
                tasks: ['default']
            },
            bower: {
                files: ['bower.json'],
                tasks: ['default']
            }
        },
        copy: {
            dev: {
                expand: true,
                src: ['index.html', 'app/**'],
                dest: 'dist/',
            },
            dist: {
                src: 'app/styles/**',
                dest: 'dist/'
            }
        },
        wiredep: {
            target: {
                directory: 'bower_components',
                src: 'dist/index.html'
            }
        },
        includeSource: {
            options: {
                baseUrl: '',
                templates: {
                    html: {
                        js: '<script src="{filePath}"></script>',
                        css: '<link rel="stylesheet" type="text/css" href="{filePath}" />',
                    }
                }
            },
            app: {
                files: {
                    'dist/index.html': 'dist/index.html'
                }
            }
        },
        useminPrepare: {
            html: 'dist/index.html'
        },
        usemin: {
            html: ['dist/index.html']
        },
        clean: {
            initial: ["dist"],
            postDist: [
                "dist/app/maps/",
                "dist/app/pages/", 
                "dist/app/templates/",
                "dist/app/theme/", 
                "dist/app/app.js", 
                "dist/bower_components/**"
            ] 
        },
        express: {
            all: {
                options: {
                    port: 9000,
                    hostname: 'localhost',
                    'bases': ['dist'],
                    livereload: true
                }
            }
        },
        angularFileLoader: {
            options: {
                scripts: ['dist/app/**/*.js'],
                startTag: 'js-files-start',
                endTag: 'js-files-end'
            },
            your_target: {
                src: ['dist/index.html']
            },
        },
        uglify: {
            options: {
                mangle: false
            }
        },
        html2js: {
            options: {
                singleModule: true,
                existingModule: true,
                module: "BlurAdmin",
                base: '.'
            },
            main: {
                src: ['app/**/*.html'],
                dest: 'dist/app/templates/templates.js'
            },
        },
    });

    grunt.registerTask('default', [
        'clean:initial', //delete previous build if any
        'copy:dev', //copy all files to dist
        'wiredep', //inject bower_components into index.html
        'html2js',
        'includeSource', //inject all devlopment files into index.html
        'angularFileLoader'
    ]);

    grunt.registerTask('dev', [
        'express',
        'default',

        'watch' // watchs for changes
    ]);


    grunt.registerTask('build', [
        'useminPrepare', 
        'concat',
        'cssmin',
        'uglify',
        'usemin',
        "clean:postDist",
    ]);
    grunt.registerTask('dist', [
        'default',
        'build'
    ]);

};