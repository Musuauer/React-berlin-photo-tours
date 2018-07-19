import React, { Component } from 'react'

class Searchbox extends Component {
  static defaultProps = {
   
  }

  render () {
    return(
        <div className="searchbox">
          <input
            type='text'
            placeholder='Search by place'
            // onChange={(event) => { updateQuery(event.target.value) }}
          />
        </div>
        
    )
  }
}

export default Searchbox