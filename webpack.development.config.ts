import path from 'path';
import webpack from 'webpack';

import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";

export default {
    mode: 'development',
    entry: {
        "popup/popup": './src/popup/popup.tsx',
        "scripts/content": './src/scripts/content/index.ts',
        "side_panel/side_panel": './src/side_panel/side_panel.tsx',
        "scripts/injected": './src/scripts/injected/index.ts',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', '.css'],
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                            presets: [
                                '@babel/preset-env',
                                '@babel/preset-typescript',
                                ['@babel/preset-react', { "runtime": "automatic" }]
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                ],
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/popup/index.html',
            chunks: ['popup/popup'],
            filename: 'popup/index.html',
        }),
        new HtmlWebpackPlugin({
            template: './src/side_panel/index.html',
            chunks: ['side_panel/side_panel'],
            filename: 'side_panel/index.html',
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/manifest.json', to: 'manifest.json' },
                // { from: 'src/side_panel/style.css', to: 'side_panel/style.css' },
            ]
        })
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    optimization: {
        splitChunks: {
            chunks: 'all', // ensures both sync and async chunks are split
            minSize: 20000,
            maxSize: 240000, // try to keep chunks under this size
        },
    },
    performance: {
        maxEntrypointSize: 300000, // or more
        maxAssetSize: 300000,
        hints: false,
    },
    devServer: {
        hot: true,
    },
    devtool: 'eval-cheap-module-source-map',
    watchOptions: {
        ignored: /node_modules/,
    },
    cache: {
        type: 'filesystem',
    },
} as webpack.Configuration;