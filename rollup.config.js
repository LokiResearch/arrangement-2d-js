import typescript from '@rollup/plugin-typescript';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import htmlTemplate from 'rollup-plugin-generate-html-template';

const lib_cfg = {};

const examples_cfg = [
{
  input: 'examples/ArrangementExample.ts',
  output: {
    file: 'build-examples/ArrangementExample.js',
  },
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
    }),
    nodeResolve(),
    htmlTemplate({
      template: 'examples/ArrangementExample.html',
      target: 'ArrangementExample.html',
      attrs: ['type="module"']
    }),
  ]
}];

let exported;
if (process.env.examples) {
  exported = examples_cfg;
} else {
  exported = lib_cfg;
}

export default exported;