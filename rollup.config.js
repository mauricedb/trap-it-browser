import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: './src/index.ts',
  output: {
    file: './dist/trap-it.js',
    name: 'trapIt',
    format: 'umd'
  },
  plugins: [
    typescript({
      typescript: require('typescript')
    }),
    commonjs(),
    resolve()
  ]
};
