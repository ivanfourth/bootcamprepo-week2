module.exports = function(grunt) {
  grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      pug: {
        compile: {
          options: {
            pretty: true,
          },
          files: {'index.html' : ["pug/index.pug","pug/header.pug"] }
        }
      },
      sass:{
        dev:{
          options:{
            noCache: '',
            sourcemap:'none',
            style:"expanded",
            spawn: false
          },
          src: "css/styles.scss",
          dest: "css/styles.css"
        }
      },
      autoprefixer: {
        dev: {
          options: {
            browsers: ["last 30 version"]
          },
          src: "css/styles.css"
        }
      },
      cssmin: {
        prod:{
          files: {
            "css/4-min/styles.min.css" : "css/styles.css"
          }
        }
      },
      watch: {
        grunt: { files: ['Gruntfile.js'] },
        options:{
          spawn:false,
          livereload:true
        },
        dev:{
          files:["css/**/*"],
          tasks:['default']
        },
      //pug: {
      //      files: ['**/*.pug'],
      //      tasks: ['pug']
      //    },
      }
  });
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  //grunt.loadNpmTasks('grunt-contrib-pug');
  //Custom tasks
  grunt.registerTask('default',['sass','autoprefixer','cssmin','watch']);

};
