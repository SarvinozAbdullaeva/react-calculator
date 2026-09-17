import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base must match your repo name so assets load correctly on GitHub Pages
// e.g. if your repo is github.com/sarvinozabdullaeva/react-calculator
// then base is '/react-calculator/'
export default defineConfig({
  plugins: [react()],
  base: '/react-calculator/',
})
