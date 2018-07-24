import React from 'react'

function Marker (props) {

  return (
    <div className='marker'>
      {/* <svg version='1.0' xmlns='http://www.w3.org/2000/svg' viewBox='0 -256 1950 1950'><path className='camera-icon' d='m975.19 549.05q119 0 203.5 84.5t84.5 203.5-84.5 203.5-203.5 84.5-203.5-84.5-84.5-203.5 84.5-203.5 203.5-84.5m704-416q106 0 181 75t75 181v896q0 106-75 181t-181 75h-1408q-106 0-181-75t-75-181v-896q0-106 75-181t181-75h224l51-136q19-49 69.5-84.5t103.5-35.5h512q53 0 103.5 35.5t69.5 84.5l51 136h224m-704 1152q185 0 316.5-131.5t131.5-316.5-131.5-316.5-316.5-131.5-316.5 131.5-131.5 316.5 131.5 316.5 316.5 131.5' /></svg> */}

      <div className='marker-name'>
        {props.name}
      </div>
      {props.isOpen && <InfoWindow onCloseClick={props.onToggleOpen}>
        <FaAnchor />
      </InfoWindow>}

    </div>

  )
}

export default Marker
