import babel from 'rollup-plugin-babel'
import cleanup from 'rollup-plugin-cleanup'
import commonjs from 'rollup-plugin-commonjs'
import progress from 'rollup-plugin-progress'
import replace from 'rollup-plugin-modify'
import resolve from 'rollup-plugin-node-resolve'
import {eslint} from 'rollup-plugin-eslint'
import {terser} from 'rollup-plugin-terser'
import pkg from './package.json'

export default [
  {
    input: 'src/index.js',
    external: ['react'],
    treeshake: true,
    output: [{file: 'lib/react-jsbox.js', format: 'cjs'}],
    plugins: [
      progress(),
      eslint(),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      resolve(),
      babel({
        extensions: ['.js'],
        runtimeHelpers: true,
        exclude: ['node_modules/@babel/**', /\/core-js\//],
        presets: pkg.babel.presets,
        plugins: pkg.babel.plugins
      }),
      commonjs(),
      terser(),
      cleanup()
    ]
  }
]
