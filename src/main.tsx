import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Pokemon } from './components/Pokemon'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Pokemon id="35"/>
  </React.StrictMode>
)
