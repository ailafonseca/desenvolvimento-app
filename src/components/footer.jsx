import React from 'react'
import Proptypes from 'prop-types'

function Footer ({ awaysOnTop, children }) {
  const styleOnTop = {
    position: 'fixed',
    buttom: '10px',
    width: '100%'
  }

  return (
    <div
      // className='sticky'
      style={styleOnTop}
    >
      {children}
    </div>
  )
}

Footer.propTypes = {
  awaysOnTop: Proptypes.bool
}

export default Footer
