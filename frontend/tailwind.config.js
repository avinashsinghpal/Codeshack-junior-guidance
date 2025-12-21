/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                'x-black': '#000000',
                'x-card': '#16181C',
                'x-border': '#2F3336',
                'x-text': '#E7E9EA',
                'x-text-secondary': '#71767B',
                'x-blue': '#1D9BF0',
                'x-hover': '#1A1A1A',
                'x-success': '#00BA7C',
            },
        },
    },
    plugins: [],
}
