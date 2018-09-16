import typescript from 'rollup-plugin-typescript2';

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
    })
  ]
};
