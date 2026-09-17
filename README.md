# React Calculator

A simple calculator built with React (Vite). Supports addition, subtraction,
multiplication, division, and reset.

## Tech stack
- React 18
- Vite

## Run locally
```
npm install
npm run dev
```
Then open the local URL Vite prints (usually http://localhost:5173).

## Build for production
```
npm run build
```
This creates a `dist` folder with the static site.

## Deploy to GitHub Pages
```
npm install --save-dev gh-pages
npm run deploy
```
This pushes the `dist` folder to a `gh-pages` branch and publishes it at:
https://sarvinozabdullaeva.github.io/react-calculator

## Project structure
```
calculator-app/
  index.html
  vite.config.js
  src/
    main.js         # mounts the app (React.createElement, no JSX)
    App.js           # top-level component
    Calculator.js     # calculator logic + UI
    Calculator.css     # calculator styling
    index.css          # global page styling
```

Components are written in plain JavaScript (`React.createElement(...)`)
rather than JSX, so no `.jsx` extension or JSX compiler step is needed.
