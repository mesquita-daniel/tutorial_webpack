const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
            {
                test: /\.html$/, // regexes ficam entre /
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            }
            // html-loader vai processar todos os arquivos que terminam com html
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
            // pega o que está no template e colocar o output no folder dist
        }),
    ]
}