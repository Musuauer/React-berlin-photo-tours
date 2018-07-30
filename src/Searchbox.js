import React, { Component } from 'react'



class Searchbox extends Component {

  render () {
    const { updateQuery, query } = this.props
    return (

      <div className='searchbox'>
        <input
          type='text'
          placeholder='Filter by name'
          value={query}
          onChange={(event) => updateQuery(event.target.value)}
        />
      </div>

    )
  }
}

export default Searchbox
