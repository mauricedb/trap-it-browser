import typescript from 'rollup-plugin-typescript2';

export default {
  input: './src/main.ts',
  output: {
    file: './dist/main.js',
    name: 'trapIt',
    format: 'umd'
  },
  plugins: [
    typescript({
      typescript: require('typescript')
    })
  ]
};
