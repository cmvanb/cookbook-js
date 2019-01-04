import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const rootPath = path.resolve(__dirname, '..');
const srcPath = path.join(rootPath, 'src');

const baseConfig = (env, {}) => ({
    entry: path.join(srcPath, 'entry.js'),
    output: {
        filename: 'app.js',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.css', '.svg'],
        modules: [srcPath, 'node_modules']
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
            template: path.join(srcPath, 'index.html'),
            filename: './index.html'
        })
    ]
});

export default baseConfig;
