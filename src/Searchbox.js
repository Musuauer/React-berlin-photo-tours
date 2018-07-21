import React from 'react'

function Searchbox (updateQuery) {
  return (
    <div className='searchbox'>
      <input
        type='text'
        placeholder='Search'
        onChange={(event) => { updateQuery(event.target.value) }}
      />
    </div>

  )
}

export default Searchbox
