const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const rootPath = path.resolve(__dirname, '..');
const clientPath = path.join(rootPath, 'client');

module.exports = {
    default: (env, {}) => ({
        entry: path.join(clientPath, 'entry.js'),
        output: {
            filename: 'app.js',
        },
        resolve: {
            extensions: ['.js', '.jsx', '.json', '.css', '.svg'],
            modules: [clientPath, 'node_modules']
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader'
                    }
                },
                {
                    test: /\.html$/,
                    use: {
                        loader: 'html-loader'
                    }
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.join(clientPath, 'index.html'),
                filename: './index.html'
            })
        ]
    }),
}

// export default baseConfig;
