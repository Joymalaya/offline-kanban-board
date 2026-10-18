import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
// @ts-expect-error Vite handles CSS imports during the build process
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)