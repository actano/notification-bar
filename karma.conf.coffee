module.exports = (config) ->
    config.set
        frameworks: ['mocha', 'chai']

        files: [
            'out/component-build/build.js'
            'lib/test/**/*.coffee'
        ]

        preprocessors:
            '**/*.coffee': ['coffee']

        singleRun: false
