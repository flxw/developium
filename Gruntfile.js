'use strict';

module.exports = function(grunt) {
  // Load Grunt tasks declared in the package.json file
  grunt.loadNpmTasks('grunt-http-server')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-stylus')

  grunt.initConfig({
    /*connect: {
      'all': {
        options:{
          port: 9999,
          hostname: "0.0.0.0",
          // No need for keepalive anymore as watch will keep Grunt running
          //keepalive: true,

          // Livereload needs connect to insert a cJavascript snippet
          // in the pages it serves. This requires using a custom connect middleware
          middleware: function(connect, options) {
            return [
              // Load the middleware provided by the livereload plugin
              // that will take care of inserting the snippet
              require('grunt-contrib-livereload/lib/utils').livereloadSnippet,
              // Serve the project folder
              connect.static(options.base)
            ];
          }
        }
      }
    }*/
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
      files:['index.html', 'css/*.styl'],
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
          'css/style.css': ['css/sidebar.styl', 'css/general.styl']
        }
      }
    }
  })

  grunt.registerTask('default', ['http-server:dev', 'watch'])
}