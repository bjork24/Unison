module.exports = function (grunt) {

  "use strict";
  
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    connect: {
      server: {
        options: {
          port: 2424,
          base: 'public',
          livereload: true,
          keepalive: true
        }
      }
    },

    watch: {
      css: {
        files: 'public/scss/*.scss',
        tasks: ['compass'],
        options: {
          livereload: true,
        },
      },
    },

    jshint: {
      files: {
        src: ['public/js/*.js', 'Gruntfile.js']
      },
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        },
      }
    },

    uglify: {
      options: {
        report: 'gzip'
      },
      my_target: {
        files: {
          'public/js/unison.min.js': ['public/js/unison.js']
        }
      }
    },

    compass: {
      dev: {
        options: {
          sassDir: 'public/scss',
          cssDir: 'public/css',
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