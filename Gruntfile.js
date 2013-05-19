module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: [
                '_assets/js/tinynav-alt.js',
                '_assets/js/app.js'
             ],
        dest: 'js/app.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'js/app.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    jshint: {
      files: ['gruntfile.js', '_assets/js/**/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>', '_assets/less/**/*.less', '_assets/less/**/*.css'],
      tasks: ['jshint', 'concat', 'less:dev']
    },
    less: {
      dev: {
        options: {
          paths: ["_assets/less"]
        },
        files: {
          "css/app.css": "_assets/less/app.less"
        }
      },
      prod: {
        options: {
          paths: ["_assets/less"],
          yuicompress: true
        },
        files: {
          "css/app.min.css": "_assets/less/app.less"
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'less:dev']);
  grunt.registerTask('production', ['jshint', 'concat', 'uglify', 'less:prod']);

};
