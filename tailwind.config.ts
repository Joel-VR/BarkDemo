import type { Config } from 'tailwindcss'
const config: Config = { content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'], theme: { extend: { colors: { bark: '#ceff00' }, fontFamily: { sans: ['Arial', 'sans-serif'] } } }, plugins: [] }
export default config
