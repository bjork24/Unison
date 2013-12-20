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
          'js/unison-responsive-comments.min.js': ['js/unison-responsive-comments.js'],
          'js/page.min.js': ['js/unison.js','js/unison-responsive-comments.js','js/demo.js']
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

    less: {
      development: {
        options: {
          paths: ["less"]
        },
        files: {
          "css/unison-less.css": "less/breakpoints.less"
        }
      },
    },

    concurrent: {
      target: {
        tasks: ['connect', 'compass', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    },

    shell: {
      options: {
        stdout: true
      },
      pushToMaster: {
        command: [
        'git checkout master',
        'rm -rf css/ js/',
        'git checkout gh-pages -- js',
        'rm -rf js/demo.js js/page.min.js',
        'git checkout gh-pages -- scss',
        'mv scss/ css/',
        'rm -rf css/modules/ css/patterns/ css/_mixins.scss css/unison.scss',
        'git status',
        'git add --all',
        'git status',
        'git commit -m "Pull new dist from gh-pages"',
        'git push',
        'git co gh-pages'
        ].join('&&')
      }
    }

  });

grunt.registerTask('server', ['concurrent:target']);
grunt.registerTask('dist', ['shell:pushToMaster']);

};