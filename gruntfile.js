module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    compress: {
      main: {
        options: {
          archive: 'bundle.tgz',
          mode: 'tgz'
        },
        expand: true,
        cwd: 'hello-world/dist',
        src: ['**/*'],
        dest: '/'
      }
    },
    aws_s3: {
      options: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        uploadConcurrency: 5,
        bucket: 'a8e680aa-b7bf-47fe-8aff-4c93fafd4182',
        region: 'us-west-2'
      },
      staging: {
        files: [{ src: 'bundle.tgz', dest: '/' }]
      }
    }
  });

  grunt.registerTask('deploy', ['compress', 'aws_s3:staging']);
}