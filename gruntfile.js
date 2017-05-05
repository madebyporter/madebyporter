module.exports = function (grunt) {

var mozjpeg = require('imagemin-mozjpeg');
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      css: {
        src: ['source/assets/vendor/css/*', 'source/assets/css/style.css'],
        dest: 'source/assets/css/output.css'
      },
      js: {
        src: ['source/assets/vendor/js/*', 'source/assets/js/_global.js'],
        dest: 'source/assets/js/output.js',
      }
    },
    uglify: {
      dev: {
        options: {
          beautify: true
        },
        files: {
          'build/assets/js/output.min.js': ['source/assets/js/output.js']
        },
      },
      dist: {
        files: {
          'build/assets/js/output.min.js': ['source/assets/js/output.js']
        },
      }
    },
    watch: {
      scripts: {
        files: ['source/assets/vendor/js/*', 'source/assets/js/_global.js'],
        tasks: ['concat'],
      },
    },

  });

  grunt.loadNpmTasks('grunt-middleman');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-slim');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-newer');

  // Default task(s).
  grunt.registerTask('default', ['newer:concat', 'watch']);
  // grunt.registerTask('dev', ['newer:imagemin', 'newer:concat:js', 'watch:scripts']);
  // grunt.registerTask('server', ['middleman:server']);
};