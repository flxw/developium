'use strict';

module.exports = function(grunt) {
  // Load Grunt tasks declared in the package.json file
  grunt.loadNpmTasks('grunt-http-server')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-stylus')

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
    }
  })

  grunt.registerTask('default', ['http-server:dev', 'watch'])
  grunt.registerTask('build', ['stylus'])
}