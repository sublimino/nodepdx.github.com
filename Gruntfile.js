module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    markdown: {
      options: {
        disqus: "nodepdx",
        layouts: {
          wrapper: "blog/templates/wrapper.us",
          index: "blog/templates/index.us",
          post: "blog/templates/post.us",
          archive: "blog/templates/blank.us"
        },
        paths: {
          markdown: "blog/markdown/*.md",
          posts: ".",
          index: "index.html",
          archive: "deleteme.html"
        }
      },
      build: {
        dest: "blog"
      }
    }
  });

  grunt.loadNpmTasks('grunt-markdown-blog');
  grunt.registerTask('default', ['markdown']);
};
