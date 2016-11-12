export default function(config) {
    return config.set({
        frameworks: ['mocha', 'chai'],

        files: [
            'out/component-build/build.js',
            'out/component-build/build.css',
            'lib/test/**/*.coffee',
            {pattern: 'out/component-build/fortawesome/**/*', watched: false, included: false, served: true}
        ],

        preprocessors: {
            '**/*.coffee': ['coffee']
        },

        singleRun: false
    });
};
