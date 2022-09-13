import React from 'react'
// import GoogleTagManager from 'components/GoogleTagManager'

class MainContainer extends React.Component {
  render () {
    const { children } = this.props
    return (
      <main className='container-principal'>
        {/* <GoogleTagManager gtmId='GTM-5HT9S3B' /> */}
        {children}
      </main>
    )
  }
}

export default MainContainer
