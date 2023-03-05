import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { Configuration, container } from 'webpack';

const config: Configuration = {
    target: 'web',
    entry: { main: './src/index.tsx' },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles/[name].css',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
};

export default config;
