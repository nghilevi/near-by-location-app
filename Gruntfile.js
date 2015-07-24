/**
 * Created by nghi on 19.7.2015.
 */
//Created manually
module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat:{
      styles:{
        src:'src/styles/*.css',
        dest:'dist/src/styles/<%= pkg.name %>.css'
      },
      scripts:{
        src:'src/scripts/*.js',
        dest:'dist/src/scripts/<%= pkg.name %>.js'
      }
    },
    ngAnnotate: {
      dist: {
        files: [{//TODO
          expand: true,
          src: ['<%= concat.scripts.dest %>'],
          ext: '.annotated.js', // Dest filepaths will have this extension.
          extDot: 'last',
        }]
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/src/scripts/<%= pkg.name %>.annotated.min.js': ['dist/src/scripts/<%= pkg.name %>.annotated.js'] //TODO use template
        }
      }
    },
    cssmin:{
      dist: {
        files: {
          'dist/src/styles/<%= pkg.name %>.min.css': ['<%= concat.styles.dest %>']
        }
      }
    },
    copy: {
      main: {
        files: [
          //{src: 'index-main.html', dest: 'dist/index.html'},
          //{src: 'src/views/404.html', dest: 'dist/src/views/404.html'},
          //{src: 'src/views/listView.html', dest: 'dist/src/views/listView.html'}
        ]
      }
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: [
          {src: 'src/views/404.html', dest: 'dist/src/views/404.html'},
          {src: 'src/views/listView.html', dest: 'dist/src/views/listView.html'}
        ]
      }
    },
    watch: { //TODO
      files: ['src/**/*.js','src/**/*.css'],
      tasks: ['default']
    },
    connect: {
      server: {
        options: {
          port: 8000,
          base: 'src'
        }
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: false,
        plugins:[ //this helps solving the problem of "Can not load "coverage", it is not registered!"
          'karma-jasmine',
          'karma-coverage',
          'karma-phantomjs-launcher'
        ]
      }
    },
    protractor: {
      e2e: {
        options: {
          args: {
            specs: ['test/e2e/**/*.js']
          },
          configFile: 'protractor.conf.js',
          keepAlive: true
        }
      }
    },
    protractor_webdriver: {
      start: {
        options: {
          path: './node_modules/protractor/bin/',
          command: 'webdriver-manager start',
        },
      }
    }
  });
  grunt.registerTask('test', [
    'karma:unit'
  ]);
  grunt.registerTask('e2e', [
    'connect:server',
    'protractor_webdriver:start',
    'protractor:e2e'
  ]);
  grunt.registerTask('default', ['concat','htmlmin','cssmin','ngAnnotate','uglify','copy']);//'copy'
  grunt.registerTask('build', ['test','default']);
}