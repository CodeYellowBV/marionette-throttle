import path from 'path';

export default {
    entry: path.join(__dirname, 'index.js'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'marionette-throttle.js',
        library: 'marionette-throttle',
        libraryTarget: 'umd',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
            },
        ],
    },
    externals: {
        backbone: {
            root: 'Backbone',
            commonjs: 'backbone',
            commonjs2: 'backbone',
            amd: 'backbone',
        },
        'backbone.marionette': {
            root: 'Backbone.Marionette',
            commonjs: 'backbone.marionette',
            commonjs2: 'backbone.marionette',
            amd: 'backbone.marionette',
        },
        underscore: {
            root: '_',
            commonjs: 'underscore',
            commonjs2: 'underscore',
            amd: 'underscore',
        },
    },
};
