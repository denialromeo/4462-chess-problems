module.exports = {
    entry: "./index.js",
    output: {
        path: __dirname + "/dist",
        filename: "chess-puzzle-player.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                   loader: 'babel-loader',
                   options: {
                      presets: ['babel-preset-env']
                  }
                }
            }
        ]
    },
    devServer: {
        port: 8000
    },
    performance: { hints: false },
    mode: "production",
};
