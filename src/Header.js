import React, { Component } from 'react'

class Header extends Component {
  static defaultProps = {

  }

  render () {
    return (
      <header className='App-header'>
        <h1 className='App-title'>Berlin Photo-tours</h1>

        <p className='App-intro'>
          Discover photography, get to know Berlin.
        </p>
      </header>

    )
  }
}

export default Header
