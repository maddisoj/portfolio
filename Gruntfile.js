module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.initConfig({
        jade: {
            debug: {
                options: {
                    pretty: true
                },
                files: [{
                    expand: true,
                    cwd: "src/jade/",
                    src: "**/*.jade",
                    dest: "build/",
                    ext: ".html"
                }]
            },

            release: {
                options: {
                    pretty: false
                },
                files: [{
                    expand: true,
                    cwd: "src/jade/",
                    src: "**/*.jade",
                    dest: "build/",
                    ext: ".html"
                }]
            }
        },

        less: {
            debug: {
                options: {
                    compress: false,
                    strictImports: true,
                },
                files: [{
                    expand: true,
                    cwd: "src/less/",
                    src: ["**/*.less", "!**/reset.less"],
                    dest: "build/assets/css",
                    ext: ".css"
                }]
            },
            release: {
                options: {
                    compress: true,
                    strictImports: true,
                },
                files: [{
                    expand: true,
                    cwd: "src/less/",
                    src: ["**/*.less", "!**/reset.less"],
                    dest: "build/assets/css",
                    ext: ".css"
                }]
            }
        },

        watch: {
            styles: {
                files: ["src/less/**/*.less"],
                tasks: ["less:debug"],
                options: {
                    nospawn: true
                }
            },

            markup: {
                files: [
                    "src/jade/**/*.jade",
                    "src/templates/**/*.jade",
                    "src/markdown/**/*.md",
                ],
                tasks: ["jade:debug"],
                options: {
                    nospawn: true
                }
            }
        }
    });

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['less:release', 'jade:release']);
};
