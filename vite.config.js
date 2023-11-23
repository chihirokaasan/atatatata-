import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    server: {
        host: true,
        hmr: {
            host: '169.254.116.37',
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
