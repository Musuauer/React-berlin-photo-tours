import React, { Component } from 'react'
import './App.css'
import GoogleMapLoader from 'react-google-maps-loader'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <h1 className='App-title'>Berlin Photo-tours</h1>
        </header>
        <p className='App-intro'>
          This is where the slogan goes.
        </p>

        <GoogleMapLoader/>
      </div>
    )
  }
}

export default App
