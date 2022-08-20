import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import App from './App'
import RedirectPath from './Components/RedirectPath'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route path="/:shorturl" element={<RedirectPath />} />
      </Routes>
    </Router>
  </React.StrictMode>
)