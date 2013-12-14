module.exports = function (grunt) {

  "use strict";
  
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    connect: {
      server: {
        options: {
          port: 2424,
          base: '',
          livereload: true,
          keepalive: true
        }
      }
    },

    watch: {
      options: {
          livereload: true,
        },
      css: {
        files: 'scss/**/*.scss',
        tasks: ['compass']
      },
      html: {
        files: '*.html'
      }
    },

    jshint: {
      files: {
        src: ['js/*.js', 'Gruntfile.js']
      },
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        },
        ignores: ['js/*.min.js']
      }
    },

    uglify: {
      options: {
        report: 'gzip'
      },
      my_target: {
        files: {
          'js/unison.min.js': ['js/unison.js'],
          'js/unison-conditional-load.min.js': ['js/unison-conditional-load.js'],
          'js/page.min.js': ['js/unison.js','js/unison-conditional-load.js','js/demo.js']
        }
      }
    },

    compass: {
      dev: {
        options: {
          sassDir: 'scss',
          cssDir: 'css',
          trace: true,
          force: true,
          outputStyle: 'compressed'
        }
      }
    },

    concurrent: {
      target: {
        tasks: ['connect', 'compass', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    }

  });

  grunt.registerTask('server', ['concurrent:target']);

};