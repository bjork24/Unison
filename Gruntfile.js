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
      scripts: {
        files: ['public/js/*.js', 'Gruntfile.js'],
        tasks: ['jshint'],
        options: {
          spawn: false,
        },
      },
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
          // 'public/js/output.min.js': ['public/js/input.js']
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
    },

    shell: {
      options: {
        stdout: true
      },
      newRepo: {
        command: [
          'rm -rf .git',
          'git init',
          'git add .',
          'git commit -m "New Grunt Up Instance"',
          'git remote add origin <%= grunt.config("repo") %>',
          'git push -u origin master',
          'cd ..',
          'git clone <%= grunt.config("repo") %>'
        ].join('&&')
      }
    }

  });

  grunt.registerTask('server', ['concurrent:target']);

  grunt.registerTask('init', 'Remove git and set up new repo tracking', function(n) {
    var repo = grunt.option('repo'), directory;
    if ( repo == null ) {
      grunt.log.warn('You must specify a repo (e.g. grunt init --repo=git@github.com:bjork24/grunt-up.git)');
    } else {
      directory = repo.split('/');
      directory = directory[directory.length-1].replace('.git','');
      grunt.config('repo', repo);
      grunt.config('repoDir', directory);
      grunt.task.run('shell:newRepo');
    }
  });

};