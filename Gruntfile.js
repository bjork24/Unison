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
      },
      js: {
        files: ['js/**/*.js','!js/**/*.min.js','!js/page.js'],
        tasks: ['jshint','uglify:dev']
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
      dev: {
        options: {
          compress: false,
          beautify: true,
          report: false
        },
        files: {
          'js/page.js': ['js/unison.js','js/unison-responsive-comments.js','js/demo.js']
        }
      },
      dist: {
        files: {
          'js/unison.min.js': ['js/unison.js'],
          'js/unison-responsive-comments.min.js': ['js/unison-responsive-comments.js']
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
          "css/breakpoints-less.css": "less/breakpoints.less"
        }
      },
    },

    stylus: {
      compile: {
        options: {
          paths: ["stylus"],
          compress: false
        },
        files: {
          'css/breakpoints-stylus.css': 'stylus/breakpoints.styl'
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
        'rm -rf js/demo.js js/page.js',
        'git checkout gh-pages -- scss',
        'mv scss/ css/',
        'rm -rf css/modules/ css/patterns/ css/_mixins.scss css/unison.scss css/breakpoints.scss',
        'git checkout gh-pages -- less',
        'mv less/breakpoints.less css/breakpoints.less',
        'rm -rf less/',
        'git checkout gh-pages -- stylus',
        'mv stylus/breakpoints.styl css/breakpoints.styl',
        'rm -rf stylus/',
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