import React from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import reportWebVitals from 'reportWebVitals'
import App from 'App'
import 'styles/index.scss'

const container = document.getElementById('root')
if (!container) {
    throw new Error('Failed to find the root element')
}

const root = createRoot(container)
root.render(
    <React.StrictMode>
        <HelmetProvider>
            <BrowserRouter basename={process.env.REACT_APP_BASE_URL}>
                <App />
            </BrowserRouter>
        </HelmetProvider>
    </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
