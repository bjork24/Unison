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
      css: {
        files: 'scss/**/*.scss',
        tasks: ['compass'],
        options: {
          livereload: true,
        },
      },
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
          'js/unison.min.js': ['js/unison.js']
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
          outputStyle: 'expanded'
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