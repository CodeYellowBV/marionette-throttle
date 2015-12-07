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
        underscore: {
            root: '_',
            commonjs: 'underscore',
            commonjs2: 'underscore',
            amd: 'underscore',
        },
    },
};
