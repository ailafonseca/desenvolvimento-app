import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Login from 'modules/login/loginForm'
import Teste from 'modules/teste/teste'

import DacoesRoutesArray from 'modules/negocios/doacao/routes'
import VendasRoutesArray from 'modules/negocios/venda/routes'

import VendaPerfilVisualizar from 'modules/perfil/visualizar'
import VendaPerfilTrilhas from 'modules/perfil/trilhas'
import VendaPerfilInteresses from 'modules/perfil/interesses'
import SelecaoPerfil from 'modules/perfil/selecaoPerfil'

import Perfil from 'modules/perfil'
import TrilhaStatus from 'modules/perfil/status'
import TrilhaFormulario from 'modules/perfil/forms'

import ImportarProdutosEmLotes from 'modules/importar-produtos-lote'

import Produto from 'modules/produto'
import ListProdutos from 'modules/produto/list'

import Logout from 'modules/login/logout'

export default () => {
  const routesDoacoes = DacoesRoutesArray.map(({ path, component }, key) => <Route exact path={path} component={component} key={`doacoes_route_${key}`} />)
  const routesVendas = VendasRoutesArray.map(({ path, component }, key) => <Route exact path={path} component={component} key={`vendas_route_${key}`} />)

  return (
    <Switch>
      <Route path="/teste" component={Teste} />
      <Route path="/login" component={Login} />

      <Route path="/produtos/importar" component={ImportarProdutosEmLotes} />

      {routesDoacoes}
      {routesVendas}
      <Route path="/perfil/trilhas/formulario/:id" component={TrilhaFormulario} />
      <Route path="/perfil/trilhas/:status" component={TrilhaStatus} />
      <Route path="/perfil" component={Perfil} />
      <Route path="/perfil/visualizar" component={VendaPerfilVisualizar} />
      <Route path="/perfil/trilhas" component={VendaPerfilTrilhas} />

      <Route path="/perfil/interesses" component={VendaPerfilInteresses} />
      <Route path="/perfil/selecionar" component={SelecaoPerfil} />

      <Route path="/produto/:id" component={Produto} />
      <Route exact path="/produtos" component={ListProdutos} />

      <Route path="/logout" component={Logout} />
      <Route path="/" component={Login} />

      <Route component={() => <p>Not found</p>} />
    </Switch>
  )
}
