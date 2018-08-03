import React from 'react'

/**
 * Code implemented from https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html
 *
 * @class ErrorBoundary
 *
 */
const ErrorBoundary = (props) => {
  if (props.googleError === true) {
    return (

      <div className='google-error'>
        <h3>There was an error loading the map.</h3>
        <p>Please try again later or send me an email.</p>
      </div>
    )
  }
  return props.children
}

export default ErrorBoundary
