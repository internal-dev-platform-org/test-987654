const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function (env) {
    const mode = env.production ? 'production' : 'development';
    const isDevMode = mode === 'development';
    const publicPath = '/';

    return {
        mode,
        entry: path.resolve(__dirname, '../src/bootstrap.tsx'),
        output: {
            path: path.resolve(process.cwd(), 'dist'),
            filename: '[fullhash].[name].js',
            assetModuleFilename: 'static/[hash][ext]',
            clean: true,
            publicPath,
        },
        module: {
            rules: [
                {
                    test: /\.[tj]sx?$/i,
                    exclude: /node_modules/,
                    use: 'babel-loader',
                },
                {
                    test: /\.css$/i,
                    use: [
                        isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                esModule: true,
                                modules: {
                                    mode: 'local',
                                    namedExport: false,
                                    localIdentName: isDevMode
                                        ? '[path][name]__[local]--[hash:base64:5]'
                                        : '[hash:base64:12]',
                                },
                            },
                        },
                    ],
                },
                {
                    test: /\.svg/i,
                    type: 'asset',
                },
                {
                    test: /\.(png|jpe?g|gif|ico)$/i,
                    type: 'asset/resource',
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
                    type: 'asset/resource',
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js', '.jsx'],
        },
        devServer: {
            open: true,
            compress: true,
            port: 9000,
            client: {
                overlay: true,
            },
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Headers': '*',
            },
            setupMiddlewares: function (middlewares, devServer) {
                if (!devServer) {
                    throw new Error('webpack-dev-server is not defined');
                }

                require(path.resolve(__dirname, './setupProxy.js'))(devServer.app);

                return middlewares;
            },
            devMiddleware: {
                publicPath,
            },
        },
        plugins: [
            !isDevMode && new MiniCssExtractPlugin(),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, '../public/index.html'),
                filename: 'index.html',
                minify: 'auto',
            }),
        ].filter(Boolean),
    };
};
