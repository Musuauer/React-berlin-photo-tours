import React from 'react'

function PlacesList (props) {
  return (
    <div className='placeslist'>
      <ul>
        {props.locations.length > 0
          ? (
            props.locations.map(location =>
              <li key={location.name}
                onClick={() => {
                  props.setCurrentLocation(location)
                }}>
                {location.name}
              </li>
            )
          ) : (
            <li>
              <em>No results...</em>
            </li>
          )
        }

      </ul>
    </div>

  )
}

export default PlacesList
