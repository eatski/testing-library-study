import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Profile } from './Pokemon'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Profile id="35"/>
  </React.StrictMode>
)
