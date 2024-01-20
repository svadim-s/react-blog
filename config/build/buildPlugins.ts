import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { type BuildOptions } from './types/config'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'
const CircularDependencyPlugin =
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('circular-dependency-plugin')
const BundleAnalyzerPlugin =
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin

export function buildPlugins ({ paths, isDev, apiUrl, project }: BuildOptions): webpack.WebpackPluginInstance[] {
  const plugins = [
    new HtmlWebpackPlugin({
      template: paths.html
    }),
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css'
    }),
    new webpack.DefinePlugin({
      __IS_DEV__: JSON.stringify(isDev),
      __API__: JSON.stringify(apiUrl),
      __PROJECT__: JSON.stringify(project)
    }),
    new CopyPlugin({
      patterns: [
        { from: paths.locales, to: paths.buildLocales }
      ]
    })
  ]

  if (isDev) {
    plugins.push(new ReactRefreshWebpackPlugin({ overlay: false }))
    plugins.push(new webpack.HotModuleReplacementPlugin())
    plugins.push(new BundleAnalyzerPlugin({
      openAnalyzer: false
    }))
    plugins.push(new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: true
    }))
  }

  return plugins
}
