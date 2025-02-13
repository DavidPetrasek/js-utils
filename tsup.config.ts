import { defineConfig } from 'tsup'

export default defineConfig({
  entry: 
  [
    'src/element/form.ts',
    'src/element/util.ts',
    'src/array.ts',
    'src/file.ts',
    'src/function.ts',
    'src/is.ts',
    'src/misc.ts',
    'src/string.ts',
  ],
  format: ["cjs", "esm"],
  dts: true,  
  splitting: false,
  sourcemap: true,
  clean: true,
})
