module.exports = api => {
  api.cache(true)
  return {
    presets: [['@babel/preset-env', { loose: true, modules: false, targets: 'iOS 11' }], '@babel/preset-react'],
    plugins: [
      [
        '@babel/plugin-proposal-decorators',
        {
          legacy: true
        }
      ],
      [
        '@babel/plugin-proposal-class-properties',
        {
          loose: true
        }
      ]
    ]
  }
}
