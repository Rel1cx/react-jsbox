import babel from 'rollup-plugin-babel'
import cleanup from 'rollup-plugin-cleanup'
import commonjs from 'rollup-plugin-commonjs'
import progress from 'rollup-plugin-progress'
import replace from 'rollup-plugin-modify'
import resolve from 'rollup-plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import path from 'path'
import pkg from './package.json'

const SOURCE_DIR = path.resolve(__dirname, 'src')
const DIST_DIR = path.resolve(__dirname, 'dist')
const input = `${SOURCE_DIR}/index.js`

const getBabelOptions = ({ useESModules }) => ({
  exclude: '**/node_modules/**',
  runtimeHelpers: true,
  configFile: path.join(__dirname, './babel.config.js'),
  plugins: ['babel-plugin-annotate-pure-calls', ['@babel/plugin-transform-runtime', { useESModules }]]
})

export default [
  {
    input,
    treeshake: true,
    external: ['react'],
    output: { file: `${DIST_DIR}/${pkg.name}.cjs.js`, format: 'cjs' },
    plugins: [
      progress(),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      resolve(),
      babel(getBabelOptions({ useESModules: false })),
      commonjs(),
      terser(),
      cleanup()
    ]
  }
]
