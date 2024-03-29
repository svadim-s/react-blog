import path from 'path'
import webpack, { DefinePlugin } from 'webpack'
import { buildCssLoader } from '../build/loaders/buildCssLoader'
import { BuildPath } from '../build/types/config'

export default ({ config }: { config: webpack.Configuration }) => {
  const paths: BuildPath = {
    build: '',
    html: '',
    entry: '',
    src: path.resolve(__dirname, '..', '..', 'src'),
    locales: '',
    buildLocales: ''
  }

  config.resolve = {
    ...config.resolve,
    modules: [
      path.resolve(__dirname, '../../src'),
      'node_modules',
      ...(config.resolve?.modules || [])
    ],
    extensions: [
      ...(config.resolve?.extensions || []),
      '.ts',
      '.tsx'
    ]
  }

  // config.resolve?.modules?.push(paths.src)
  // config.resolve?.modules?.push(path.resolve(__dirname, '../../src'), 'node_modules')
  // config.resolve?.extensions?.push('.ts', '.tsx')

  if (config.module?.rules) {
    config.module.rules = config.module?.rules?.map((rule: webpack.RuleSetRule | '...') => {
      // eslint-disable-next-line @typescript-eslint/prefer-includes
      if (rule !== '...' && /svg/.test(rule.test as string)) {
        return { ...rule, exclude: /\.svg$/i }
      }

      return rule
    })
  }

  config.module?.rules?.push({
    test: /\.svg$/,
    use: ['@svgr/webpack']
  })
  config.module?.rules?.push(buildCssLoader(true))

  config?.plugins?.push(new DefinePlugin({
    __IS_DEV__: JSON.stringify(true),
    __API__: JSON.stringify('https://testapi.ru'),
    __PROJECT__: JSON.stringify('storybook')
  }))

  config.resolve.alias = {
    ...config.resolve.alias,
    '@/shared': path.resolve(__dirname, '..', '..', 'src', 'shared'),
    '@/entities': path.resolve(__dirname, '..', '..', 'src', 'entities'),
    '@/features': path.resolve(__dirname, '..', '..', 'src', 'features'),
    '@/widgets': path.resolve(__dirname, '..', '..', 'src', 'widgets'),
    '@/pages': path.resolve(__dirname, '..', '..', 'src', 'pages'),
    '@/app': path.resolve(__dirname, '..', '..', 'src', 'app')
  }

  return config
}
