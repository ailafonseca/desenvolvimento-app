import React from 'react'

export default ({ vMiddle, hRight, as, children }) => {
  if (as === 'label' && vMiddle) {
    if (hRight) {
      return (
        <label className='p-2 h-100 d-flex align-items-center align-items-end'>
          {children}
        </label>
      )
    }

    return (
      <label className='p-2 h-100 d-flex align-items-center w-100'>
        {children}
      </label>
    )
  }

  if (vMiddle) {
    return (
      <div className='p-2 h-100 d-flex align-items-center w-100'>
        {children}
      </div>
    )
  }

  return <>{children}</>
}
