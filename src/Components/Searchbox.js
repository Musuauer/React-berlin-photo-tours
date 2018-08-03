import React from 'react'

const Searchbox = ({updateQuery, query}) => {
  return (
    <div className='searchbox'>
      <input
        type='text'
        placeholder='Filter by name'
        value={query}
        onChange={(event) => updateQuery(event.target.value)}
        tabIndex='1'
        role='search'
        aria-label='search box'
      />
    </div>
  )
}

export default Searchbox
