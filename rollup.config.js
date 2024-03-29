import typescript from 'rollup-plugin-typescript2'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import sass from 'rollup-plugin-sass'
import excludeDependenciesFromBundle from "rollup-plugin-exclude-dependencies-from-bundle"
import postcss from 'rollup-plugin-postcss'
const postcssConfig = require('./postcss.config')

const overrides = {
  compilerOptions: { declaration: true },
  exclude: ["src/**/*.test.tsx", "src/**/*.stories.tsx", "src/**/*.stories.mdx", "setupTests.ts"]
}
const config = {
  input: 'src/index.tsx',
  output: [
    {
      file: 'dist/index.es.js',
      format: 'es'
    }
  ],
  plugins: [
    nodeResolve(),
    commonjs(),
    json(),
    excludeDependenciesFromBundle(),
    typescript({ tsconfigOverride: overrides }),
    sass({ output: 'dist/index.css' }),
    postcss({
      extract: true,
      //新增
      plugins: postcssConfig.plugins
    })
  ],
  // external: ['react', 'react-dom', 'axios']
}

export default config