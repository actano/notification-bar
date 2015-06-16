module.exports = (config) ->
    config.set
        basePath: ''
        frameworks: ['mocha', 'chai']

        files: [
            'out/component-build/build.js'
            'lib/test/**/*.coffee'
        ]

        exclude: [
        ]

        preprocessors: {
            '**/*.coffee': ['coffee']
        }


        reporters: ['progress']

        port: 9876
        colors: true
        logLevel: config.LOG_INFO
        autoWatch: true
        browsers: []
        singleRun: false
