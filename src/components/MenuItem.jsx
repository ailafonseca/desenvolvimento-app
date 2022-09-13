import React from 'react'
import { NavLink } from 'react-router-dom'

const MenuItem = (props) => (
  <NavLink to={props.to} className={`default-menu-item btn ${props.className ? props.className : ''}`}>
    {props.menuicon}
    <span>{props.label}</span>
  </NavLink>
)

export default MenuItem
