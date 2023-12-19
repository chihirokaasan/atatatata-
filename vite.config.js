import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import { loadEnv } from 'vite';
const env = loadEnv(process.env.NODE_ENV, process.cwd(), '');
export default defineConfig({
    server: {
        host: true,
        hmr: {
            host: env.APP_ENV || 'localhost',
        },
        watch: {
            usePolling: true,
            interval: 1000,
        },
    },
    plugins: [
        laravel({
            input: ['resources/sass/app.css', 'resources/js/app.js'],
            refresh: true,
        }),
    ],

});
