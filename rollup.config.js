import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-modify'
import cleanup from 'rollup-plugin-cleanup'
import progress from 'rollup-plugin-progress'
import { terser } from 'rollup-plugin-terser'

import pkg from './package.json'

export default [
  {
    input: 'src/index.js',
    external: ['react'],
    treeshake: true,
    output: [{ file: pkg.main, format: 'cjs' }],
    plugins: [
      progress(),
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
