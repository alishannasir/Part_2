import React from 'react'
import "../Notification/Notification.css"

function Notification({message}) {
    if (message === null) {
        return null
      }
  return (
    <>
    <div className='error'>
      {message}
    </div>
    </>
  )
}

export default Notification