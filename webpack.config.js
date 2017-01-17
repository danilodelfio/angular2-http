module.exports = {
    entry: "./app/main",
    output: {
        path: __dirname,
        filename: "./dist/bundle.js"
    },
    resolve: {
        extensions: ['', '.js', '.ts']
    },
    module: {
        loaders: [{
            test: /\.ts/, loaders: ['ts-loader'], exclude: /node-modules/
        }]
    },
    devServer: {
        inline:true,
        port: 8008
    }
}