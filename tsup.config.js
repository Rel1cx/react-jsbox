import { defineConfig } from 'tsup'

// eslint-disable-next-line import/no-default-export
export default defineConfig(options => ({
    platform: 'browser',
    target: 'ES2015',
    name: 'tools',
    format: ['cjs'],
    entry: ['src/index.js'],
    noExternal: ['react-reconciler'],
    dts: true,
    minify: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    replaceNodeEnv: true,
    treeshake: true
}))
