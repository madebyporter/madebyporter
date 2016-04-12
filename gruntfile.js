module.exports = function (grunt) {

var mozjpeg = require('imagemin-mozjpeg');
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'assets/css/style.css': 'assets/scss/style.scss',
        }
      }
    },

    concat: {
      css: {
        src: ['assets/vendor/css/*', 'assets/css/style.css'],
        dest: 'assets/css/output.css'
      },
      js: {
        src: ['assets/vendor/js/*', 'assets/js/raw/*'],
        dest: 'assets/js/output.js',
      },
      js2: {
        src: ['assets/vendor/js/*', 'assets/js/raw/*'],
        dest: '_build/assets/js/output.js',
      }
    },

    cssmin: {
      css: {
        src: 'assets/css/output.css',
        dest: '_build/assets/css/output.min.css'
      }
    },

    uglify: {
      dev: {
        options: {
          beautify: true
        },
        files: {
          '_build/assets/js/output.min.js': ['assets/js/output.js']
        },
      },
      dist: {
        files: {
          '_build/assets/js/output.min.js': ['assets/js/output.js']
        },
      }
    },

    slim: {
      dist: {
        files: [{
          expand: true,
          cwd: '.',
          src: ['**/*.slim'],
          dest: '_build/',
          ext: '.html',
        }],
      },
    },

    imagemin: { 
      dist: {                         // Another target
        files: [{
          expand: true,                  // Enable dynamic expansion
          cwd: 'assets/img',                   // Src matches are relative to this path
          src: ['**/*.{png,jpg,gif,svg}'],   // Actual patterns to match
          dest: '_build/assets/img'                  // Destination path prefix
        }]
      }
    },

    watch: {
      css: {
        files: 'assets/**/*.scss',
        tasks: ['sass', 'concat', 'cssmin'],
        options: {
          livereload: true,
        },
      },
      slim: {
        files: ['**/*.slim'],
        tasks: ['slim'],
      },
      scripts: {
        files: 'assets/js/raw/*.js',
        tasks: ['concat'],
      },
      images: {
        files: ['assets/img/*.{png,jpg,gif,svg}','assets/vendor/js/*'],
        tasks: ['imagemin'],
      },
      options: {
        livereload: true,
      },
    },

  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-slim');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-newer');

  // Default task(s).
  grunt.registerTask('default', ['newer:imagemin', 'sass', 'slim', 'newer:cssmin', 'newer:concat', 'watch']);
  grunt.registerTask('dev', ['newer:imagemin', 'sass', 'slim', 'newer:cssmin', 'newer:concat', 'watch']);
};