module.exports = function(grunt){
  var srcFiles = ['src/core.js'],
    projectName = 'tidy_log',
    outputFile = projectName + '.js',
    minifiedFile = projectName + '.min.js';
    
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat:{
      tidy_log:{
        src:srcFiles,
        dest:outputFile
      }
    },
    uglify:{
      tidy_log:{
        files:[{
          src:outputFile,
          dest:minifiedFile
        }]
      }
    },
    watch:{
      concat_tidy_log:{
        files:srcFiles,
        tasks:['concat:' + projectName]
      },
      uglify_tidy_log:{
        files:[outputFile],
        tasks:['uglify:' + projectName]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
};