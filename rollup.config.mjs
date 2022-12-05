import {babel} from "@rollup/plugin-babel";
import {terser} from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import del from "rollup-plugin-delete";

export default [{
    input: 'src/index.js',
    output: [
        {
            file: 'dist/d-datatable-request.umd.min.js',
            format: 'umd',
            name: 'd-datatable-request'
        },
        {
            file: 'dist/d-datatable-request.cjs.min.js',
            format: 'cjs',
            name: 'd-datatable-request'
        },
        {
            file: 'dist/d-datatable-request.esm.min.js',
            format: 'esm',
            name: 'd-datatable-request'
        }
    ],
    plugins: [
        del({targets: "dist/*"}),
        nodeResolve(),
        babel({
            babelrc: false,
            exclude: "**/node_modules/**",
            presets: [
                "@babel/preset-env"
            ],
            plugins: [
                "@babel/plugin-transform-runtime",
            ],
            babelHelpers: "runtime"
        }),
        commonjs(),
        terser()
    ],
}];