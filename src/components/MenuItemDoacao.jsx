import React from "react";
import { NavLink } from "react-router-dom";

const MenuItemDoacao = (props) => (
  <NavLink to={props.to} className="doacao-menu-item btn">
    {props.menuicon}
    <span>{props.label}</span>
  </NavLink>
);

export default MenuItemDoacao;
