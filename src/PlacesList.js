import React from 'react'

function PlacesList (props) {
  return (
    <div className='placeslist'>
      <ul>
        {props.locations.map(location =>
          <li key={location.name}>
            {location.name}
          </li>
        )}
      </ul>
    </div>

  )
}

export default PlacesList
