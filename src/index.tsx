/// <reference types="cordova-plugin-file" />
import React from 'react'
import ReactDOM from 'react-dom'
import App from 'app'

const renderReactDom = () => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  )
}

if (cordova) {
  document.addEventListener('deviceready', () => {
    renderReactDom()
  })
} else {
  renderReactDom()
}
