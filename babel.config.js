module.exports = api => {
  api.cache(true)
  return {
    presets: [['@babel/preset-env', {loose: true, modules: false, targets: 'iOS 12'}], '@babel/preset-react'],
    plugins: [
      [
        '@babel/plugin-proposal-class-properties',
        {
          loose: true
        }
      ]
    ]
  }
}
