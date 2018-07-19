import React from 'react'

function PlacesList (places) {
  return (
    <div className='placeslist'>
      <ul>
        {console.log('json:', places.places)}
        {places.places.map(place =>
          <li key={place.name}>
            {place.name}
          </li>
        )}
      </ul>
    </div>

  )
}

export default PlacesList
