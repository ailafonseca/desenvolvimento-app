import React from 'react'
import { connect } from 'react-redux'

import { loadAnuncios } from './action'
import { faPen, faCalendarCheck } from '@fortawesome/free-solid-svg-icons'
import Loading from 'components/loading'
import Refresh from 'components/refresh'
import { TableList, ListHeaders, ListHeaderTitle, ListBody, ListBodyRow, ListBodyCol, ActionButton, EmptyList } from 'components/style/tableList'
import { Screen } from 'components/style'

class VendaRecorrenteList extends React.Component {
  componentDidMount () {
    this.props.loadAnuncios()
  }

  renderBodyRow = (anuncio) => (
    <ListBodyRow key={anuncio.id}>
      <ListBodyCol first format='text'>
        {anuncio.contrato.nome}
      </ListBodyCol>
      <ListBodyCol format='datetime'>{anuncio.dataInicioReserva}</ListBodyCol>
      <ListBodyCol format='datetime'>{anuncio.dataFimReserva}</ListBodyCol>
      <ListBodyCol format='datetime'>{anuncio.dataInicioEntrega}</ListBodyCol>
      <ListBodyCol format='datetime'>{anuncio.dataFimEntrega}</ListBodyCol>
      <ListBodyCol last format='actionButtons'>
        <ActionButton  to={`/venda/anuncio/editar/${anuncio.id}`} classes="mr-sm-1" icon={faPen} />
        <ActionButton to={`/venda/reserva/novo/${anuncio.id}`} icon={faCalendarCheck} />
      </ListBodyCol>
    </ListBodyRow>
  );

  renderList = (list) => (
    <Screen back={{ to: '/', title: 'Menu' }}>
      <TableList>
        <ListHeaders>
          <ListHeaderTitle>Anúncio</ListHeaderTitle>
          <ListHeaderTitle className='mobile'>Inicio Reserva</ListHeaderTitle>
          <ListHeaderTitle className='mobile'>Fim Reserva</ListHeaderTitle>
          <ListHeaderTitle className='mobile'>Inicio Entrega</ListHeaderTitle>
          <ListHeaderTitle className='mobile'>Fim Entrega</ListHeaderTitle>
        </ListHeaders>
        <ListBody>{list.map((anuncio) => this.renderBodyRow(anuncio))}</ListBody>
      </TableList>
    </Screen>
  );

  render () {
    const { list, isLoading, connection, dispatch } = this.props

    if (connection) {
      return <Refresh error={connection} dispatch={dispatch} />
    }

    if (isLoading === true) {
      return <Loading />
    }

    if (list !== undefined && list.constructor === Array && list.length > 0) {
      return (
        <div className='container-fluid'>
          {this.renderList(list)}
        </div>
      )
    }

    return (
      <Screen back={{ to: '/', title: 'Menu' }}>
        <EmptyList />
      </Screen>
    )
  }
}

const mapStateToProps = (state) => ({
  list: state.vendaAnuncio.list,
  isLoading: state.vendaAnuncio.isLoading,
  connection: state.main.connection
})
const mapDispatchToProps = { loadAnuncios }
export default connect(mapStateToProps, mapDispatchToProps)(VendaRecorrenteList)
