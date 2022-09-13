import React from 'react'
import PropTypes from 'prop-types'
import { Link as LinkDom } from 'react-router-dom'

const TelaSucesso = ({ children }) => (
  <div className='container-success'>
    <div>
      {children}
    </div>
  </div>
)
TelaSucesso.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

const Link = ({ to, dispatch, children, className }) => (
  <LinkDom className={`text-center d-block ${className}`} to={to} onClick={() => dispatch && dispatch()}>
    {children}
  </LinkDom>
)
Link.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  to: PropTypes.string.isRequired,
  dispatch: PropTypes.func,
  className: PropTypes.string
}

const Mensagem = ({ children, className }) => (
  <h1 className={className}>
    {children}
  </h1>
)
Mensagem.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string
}

export { TelaSucesso, Link, Mensagem }
