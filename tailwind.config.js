/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {
            colors: {
                'obsidian-bg': '#1e1e1e',
                'obsidian-accent': '#a855f7',
                'obsidian-text': '#e5e7eb',
            }
        }
    },
    plugins: []
};
