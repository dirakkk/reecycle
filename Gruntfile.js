/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Task configuration.
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        globals: {}
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['lib/**/*.js', 'test/**/*.js']
      }
    },
    nodeunit: {
      files: ['test/**/*_test.js']
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test', 'nodeunit']
      }
    },
    image_resize: {
      resize:{
        options: {
        height: 400,
        overwrite: true
      },
      //files: {
        //'app/tmp/neosac.jpg': 'app/img/objects/neosac.jpg'
        //src: 'app/img/objects/*.jpg',
        //dest:'app/tmp/'
      //}
      files: [{
      expand: true,
      cwd: 'app/img/objects',
      src: ['*.jpg'],
      dest: 'app/tmp'
    }]
    }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-image-resize');

  // Default task.
  grunt.registerTask('default', ['jshint', 'nodeunit']);

};
