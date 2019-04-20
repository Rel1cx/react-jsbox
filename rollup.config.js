import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-modify'
import cleanup from 'rollup-plugin-cleanup'
import pkg from './package.json'

export default [
  {
    input: 'src/index.js',
    external: ['react'],
    output: [{file: pkg.main, format: 'cjs'}],
    plugins: [
      resolve(),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      commonjs(),
      babel({
        extensions: ['.js'],
        runtimeHelpers: true,
        exclude: ['node_modules/@babel/**', /\/core-js\//],
        presets: pkg.babel.presets,
        plugins: pkg.babel.plugins
      }),
      cleanup()
    ]
  }
]
