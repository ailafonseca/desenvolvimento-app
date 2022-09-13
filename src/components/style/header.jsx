import React, { useState } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { isObject } from 'lodash-es'

import { Button, Navbar } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'

import { limparSelecao } from 'modules/perfil/actions'

import { formataCPF } from 'util/utils'

const RenderUserName = ({ userName }) => {
  return <span className='loggedUser p-2'>{userName || ' - '}</span>
}

const RenderBack = ({ back }) => {
  if (isObject(back)) {
    return (
      <NavLink className='breadcrumb-item' to={back.to}>
        <FontAwesomeIcon icon={faAngleLeft} size='lg' />&nbsp;&nbsp;
        {back.title}
      </NavLink>
    )
  }

  return (<></>)
}

function Header ({ login, back, title, tabSelectedMainMenu, dispatch }) {
  const [navExpanded, setNavExpanded] = useState(false)

  return (
    <>
      <Navbar
        onToggle={() => setNavExpanded(!navExpanded)}
        expanded={navExpanded}
        expand='lg'
        bg='dark'
        variant='dark'
        className={`sticky-top ${tabSelectedMainMenu === 1 ? 'saveadd-secondary-color' : 'saveadd-primary-color'} fixed`}
      >
        {title || <RenderBack back={back} />}
        <Navbar.Toggle aria-controls='userNavbar'>
          <FontAwesomeIcon icon={faUser} size='lg' />
        </Navbar.Toggle>
        <Navbar.Collapse onSelect={() => this.closeNav()} className='justify-content-end text-right' id='userNavbar'>
          <RenderUserName userName={formataCPF(login.nomeUsuario)} />
          <Button onClick={() => dispatch(limparSelecao())} className='nav-link p-2 text-white'>
              Trocar Perfil
          </Button>
          <NavLink to='/logout' className='nav-link p-2 text-white' activeClassName='active'>
              Sair
          </NavLink>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

const mapStateToProps = (state) => ({
  ...state,
  tabSelectedMainMenu: state.main.tabSelectedMainMenu
})
const mapDispatchToProps = (dispatch) => ({ dispatch })
export default connect(mapStateToProps, mapDispatchToProps)(Header)
