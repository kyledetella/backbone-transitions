/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    meta: {
      version: '0.1.0',
      banner: '/*! App - v<%= meta.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '* http://PROJECT_WEBSITE/\n' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
        'Kyle DeTella / Trevor McNaughton; Licensed MIT */'
    },
    
    requirejs: {
      compile: {
        options: {
          baseUrl: "public/js",
          name: 'main',
          mainConfigFile: "public/js/main.js",
          out: "public/js/build/app.min.js"
        }
      }
    }

  });

  // Load npm tasks
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  // Default task.
  grunt.registerTask('default', ['requirejs']);

  // Build task
  grunt.registerTask('build', ['requirejs']);

};
