import React from 'react'
import { connect } from 'react-redux'
import { faPen } from '@fortawesome/free-solid-svg-icons'

import { DateDDMM } from 'util/display'

import { loadEntregasAnunciante } from './action'

import Loading from 'components/loading'
import Refresh from 'components/refresh'

import { TableList, ListHeaders, ListHeaderTitle, ListBody, ListBodyRow, ListBodyCol, ActionButton, EmptyList } from 'components/style/tableList'
import { Screen } from 'components/style'

class VendaListaEntregas extends React.Component {
  componentDidMount () {
    const { dispatch } = this.props
    dispatch(loadEntregasAnunciante())
  }

  renderBodyRow = (reserva) => (
    <ListBodyRow key={reserva.id}>
      <ListBodyCol first format='text'>
        {reserva.anuncio.contrato.nome}<span className='only-mobile'> - {DateDDMM(reserva.anuncio.dataInicioReserva)}</span>
      </ListBodyCol>
      <ListBodyCol format='datetime'>{reserva.anuncio.dataInicioReserva}</ListBodyCol>
      <ListBodyCol format='datetime'>{reserva.anuncio.dataFimReserva}</ListBodyCol>
      <ListBodyCol format='datetime'>{reserva.anuncio.dataInicioEntrega}</ListBodyCol>
      <ListBodyCol format='datetime'>{reserva.anuncio.dataFimEntrega}</ListBodyCol>
      <ListBodyCol last format='actionButtons'>
        <ActionButton to={`/venda/entrega-anunciante/novo/${reserva.idUltimaInteracao}`} icon={faPen} />
      </ListBodyCol>
    </ListBodyRow>
  );

  renderListReservaList = (reservaList) => (
    <TableList>
      <ListHeaders>
        <ListHeaderTitle>Entrega</ListHeaderTitle>
        <ListHeaderTitle className='mobile'>Inicio Reserva</ListHeaderTitle>
        <ListHeaderTitle className='mobile'>Fim Reserva</ListHeaderTitle>
        <ListHeaderTitle className='mobile'>Inicio Entrega</ListHeaderTitle>
        <ListHeaderTitle className='mobile'>Fim Entrega</ListHeaderTitle>
        <ListHeaderTitle className='mobile'>Ações</ListHeaderTitle>
      </ListHeaders>
      <ListBody>{reservaList.map((reserva) => this.renderBodyRow(reserva))}</ListBody>
    </TableList>
  );

  render () {
    const { listaEntregas, isLoadingEntrega, connection, dispatch } = this.props

    if (connection) {
      return <Refresh error={connection} dispatch={dispatch} />
    } else if (isLoadingEntrega === true) {
      return <Loading />
    } else if (listaEntregas !== undefined && listaEntregas.constructor === Array && listaEntregas.length > 0) {
      return (
        <Screen back={{ to: '/', title: 'Menu' }}>
          <div className='container-fluid'>
            {this.renderListReservaList(listaEntregas)}
          </div>
        </Screen>
      )
    }

    return (
      <Screen back={{ to: '/', title: 'Menu' }}>
        <h1>Lista de entregas</h1>
        <EmptyList />
      </Screen>
    )
  }
}

const mapStateToProps = (state) => ({
  ...state.vendaEntregaAnunciante,
  connection: state.main.connection
})
const mapDispatchToProps = (dispatch) => ({ dispatch })
export default connect(mapStateToProps, mapDispatchToProps)(VendaListaEntregas)
