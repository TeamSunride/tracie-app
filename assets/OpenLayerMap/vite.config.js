import { viteSingleFile } from 'vite-plugin-singlefile';

export default {
    root: ".",          // Vite starts looking from inside OpenLayerMap
    publicDir: "public",
    base: "./",
    server: {
      port: 8000,
      open: true,
    },
    build: {
        sourcemap: false,
        input: "./index.html",  // HTML entry point
    },
    outDir: "./dist", 
    emptyOutDir: true,  // Clean dist/ before building
    plugins: [viteSingleFile()],
};
