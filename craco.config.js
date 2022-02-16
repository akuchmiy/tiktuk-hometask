const { loaderByName, removeLoaders, addAfterLoader } = require('@craco/craco')

// const replaceMinimizer = (webpackConfig, name, minimizer) => {
//   const idx = webpackConfig.optimization.minimizer.findIndex(
//     (m) => m.constructor.name === name
//   )
//   if (idx > -1) webpackConfig.optimization.minimizer.splice(idx, 1, minimizer)
// }

module.exports = {
  style: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
  webpack: {
    configure: (webpackConfig, { paths }) => {
      addAfterLoader(webpackConfig, loaderByName('babel-loader'), {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        include: paths.appSrc,
        loader: require.resolve('esbuild-loader'),
        options: {
          loader: 'tsx',
          target: 'es2015',
        },
      })

      removeLoaders(webpackConfig, loaderByName('babel-loader'))

      // replaceMinimizer(
      //   webpackConfig,
      //   'TerserPlugin',
      //   new ESBuildMinifyPlugin({
      //     target: 'es2015',
      //   })
      // )

      return webpackConfig
    },
  },
}
