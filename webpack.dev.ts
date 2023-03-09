import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import { merge } from 'webpack-merge';
import commonConfig from './webpack.common';

interface Configuration extends WebpackConfiguration {
    devServer?: WebpackDevServerConfiguration;
}

const config: Configuration = {
    devtool: 'inline-source-map',
    mode: 'development',
    plugins: [new ForkTsCheckerWebpackPlugin()],
    output: {
        filename: '[name].js',
        publicPath: 'auto',
    },
    devServer: {
        historyApiFallback: true,
        port: 3004,
        hot: true,
        open: true,
    },
};

export default merge(commonConfig, config);
