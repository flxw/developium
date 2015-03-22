'use strict';

module.exports = function(grunt) {
  // Load Grunt tasks declared in the package.json file
  grunt.loadNpmTasks('grunt-http-server')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-stylus')
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-contrib-compress')

  grunt.initConfig({
    'http-server': {
      dev: {
        root: './',
        port: 9999,
        host: "0.0.0.0",
        cache: 0,
        showDir : true,
        autoIndex: true,
        ext: "html",
        runInBackground: true
      }
    },
    'lint': {
      all:['js/*.js']
    },
    'watch': {
      files:['*.html', 'assets/css/*.styl'],
      tasks:['stylus'],
      options: {
        spawn: false,
        livereload: true
      }
    },
    'stylus': {
      compile: {
        options: {
          urlfunc: 'embedurl' // use embedurl('test.png') in our code to trigger Data URI embedding
        },
        files: {
          'assets/css/style.css': ['assets/css/*.styl', 'assets/css/normalize.css']
        }
      }
    },
    'copy': {
      main: {
        files: [
          {expand: true, src: ['assets/**/style.css'], dest: 'build/'},
          {expand: true, src: ['assets/images/*'], dest: 'build/'},
          {expand: true, src: ['*.hbs'], dest: 'build/'},
          {expand: true, src: ['package.json'], dest: 'build/'}
          ]
      }
    },
    'compress': {
      main: {
        options: {
          archive: 'developium.zip'
        },
        src: ['build/**/*']
      }
    }
  })

  grunt.registerTask('default', ['http-server:dev', 'watch'])
  grunt.registerTask('build', ['stylus', 'copy', 'compress'])
}