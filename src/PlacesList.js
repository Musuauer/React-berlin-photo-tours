import React from 'react'

function PlacesList (props) {
  return (
    <div className='placeslist'>
      <ul>
        {console.log(props.locations)}

        {props.locations.map(place =>
          <li key={place.name}>
            {place.name}
          </li>
        )}
      </ul>
    </div>

  )
}

export default PlacesList
