import React from 'react'
import { connect } from 'react-redux'

import { Container, Row, Col } from 'react-bootstrap'

import { logout } from 'modules/login/loginActions'
import HeaderComponent from './header'
import FooterComponent from './footer'

function ScreenComponent ({ className, children, header, footer, login, back, title, router, middle }) {
  let headerData = (<></>)
  let footerData = (<></>)

  if (header !== false) headerData = (<HeaderComponent userDetails={login} back={back} title={title} />)
  if (footer !== false) footerData = (<FooterComponent version={global.appVersion} />)

  if (middle) {
    return (
      <>
        {headerData}
        <Container className={`h-100 align-items-center justify-content-center ${className || ''}`} style={{ minHeight: '100vh' }}>
          <Row className='justify-content-center align-items-center' style={{ minHeight: '100vh' }}>
            <Col xs={12}>
              {children}
            </Col>
          </Row>
        </Container>
        {footerData}
      </>
    )
  }

  return (
    <>
      <Container className='w-100' style={{ minWidth: '100%', padding: '0px', margin: '0px' }}>
        {headerData}
        {children}
        {footerData}
      </Container>
    </>
  )
}

const mapStateToProps = (state) => ({
  ...state,
  login: state.login,
  router: state.router
})
const mapDispatchToProps = (dispatch) => ({ dispatch, logout })
export default connect(mapStateToProps, mapDispatchToProps)(ScreenComponent)
