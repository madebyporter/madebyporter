module.exports = function (grunt) {

var mozjpeg = require('imagemin-mozjpeg');
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    middleman: {
      options: {
        useBundle: true
      },
      server: {
        options: {
          command: "server",         
          environment: "development",
          port: 4567,
          env: {}
        }
      },
      build: {
        options: {
          command: "build",
          glob: false,
          clean: true,
        }
      }
    },

    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'build/assets/css/style.css': 'source/assets/css/style.css.scss',
        }
      }
    },

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

    cssmin: {
      css: {
        src: 'source/assets/css/output.css',
        dest: 'build/assets/css/output.min.css'
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

    slim: {
      dist: {
        files: [{
          expand: true,
          cwd: 'source',
          src: ['{,*/}*.html.slim'],
          dest: 'build/',
          ext: '.html',
        }]
      }
    },

    imagemin: { 
      dist: {                         // Another target
        files: [{
          expand: true,                  // Enable dynamic expansion
          cwd: 'source/assets/img',                   // Src matches are relative to this path
          src: ['**/*.{png,jpg,gif,svg}'],   // Actual patterns to match
          dest: 'build/assets/img'                  // Destination path prefix
        }]
      }
    },

    watch: {
      css: {
        files: 'source/assets/**/*.scss',
        tasks: ['sass', 'concat', 'cssmin'],
        options: {
          livereload: true,
        },
      },
      scripts: {
        files: ['source/assets/vendor/js/*', 'source/assets/js/_global.js'],
        tasks: ['concat'],
      },
      images: {
        files: ['source/assets/img/*.{png,jpg,gif,svg}','source/assets/vendor/js/*'],
        tasks: ['imagemin'],
      },
      options: {
        livereload: true,
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
  grunt.registerTask('default', ['middleman:build', 'newer:imagemin', 'sass', 'slim', 'newer:cssmin', 'newer:concat', 'watch']);
  grunt.registerTask('dev', ['newer:imagemin', 'sass', 'newer:cssmin', 'newer:concat', 'watch']);
  grunt.registerTask('server', ['middleman:server']);
};