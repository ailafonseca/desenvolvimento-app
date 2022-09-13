import React from 'react'
import { connect } from 'react-redux'
import { Container } from 'react-bootstrap'

import { faPen } from '@fortawesome/free-solid-svg-icons'

import { loadEntregasComprador } from './action'

import Loading from 'components/loading'
import Refresh from 'components/refresh'

import { TableList, ListHeaders, ListHeaderTitle, ListBody, ListBodyRow, ListBodyCol, ActionButton, EmptyList } from 'components/style/tableList'
import { Screen } from 'components/style'

class VendaListaEntregas extends React.Component {
  componentDidMount () {
    const { dispatch } = this.props
    dispatch(loadEntregasComprador())
  }

  renderBodyRow = (reserva) => (
    <ListBodyRow key={reserva.anuncio.id}>
      <ListBodyCol first format='text'>
        {reserva.anuncio.contrato.nome}
      </ListBodyCol>
      {/* <ListBodyCol>{`${anuncio.empresa.nome}`}</ListBodyCol> */}
      <ListBodyCol format='datetime'>{reserva.anuncio.dataInicioReserva}</ListBodyCol>
      <ListBodyCol format='datetime'>{reserva.anuncio.dataFimReserva}</ListBodyCol>
      <ListBodyCol format='datetime'>{reserva.anuncio.dataInicioEntrega}</ListBodyCol>
      <ListBodyCol format='datetime'>{reserva.anuncio.dataFimEntrega}</ListBodyCol>
      <ListBodyCol last format='actionButtons'>
        <ActionButton to={`/venda/entrega-comprador/novo/${reserva.idUltimaInteracao}`} icon={faPen} hidden={reserva.anuncio.reservas.length !== 0} />
      </ListBodyCol>
    </ListBodyRow>
  );

  renderListReservaList = (reservaList) => (
    <TableList>
      <ListHeaders>
        <ListHeaderTitle>Entrega</ListHeaderTitle>
        {/* <ListHeaderTitle>Empresa</ListHeaderTitle> */}
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
          <Container fluid>
            {this.renderListReservaList(listaEntregas)}
          </Container>
        </Screen>
      )
    }

    console.log(this.props)
    return (
      <Screen back={{ to: '/', title: 'Menu' }}>
        <h1>Lista de entregas</h1>
        <EmptyList />
      </Screen>
    )
  }
}

const mapStateToProps = (state) => ({
  ...state.vendaEntregaComprador,
  connection: state.main.connection
})
const mapDispatchToProps = (dispatch) => ({ dispatch })
export default connect(mapStateToProps, mapDispatchToProps)(VendaListaEntregas)
