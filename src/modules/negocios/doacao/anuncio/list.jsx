import React from 'react'
import { connect } from 'react-redux'
import { Container } from 'react-bootstrap'

import { loadAnuncios } from './action'
import { faPen, faCalendarCheck } from '@fortawesome/free-solid-svg-icons'
import Loading from 'components/loading'
import Refresh from 'components/refresh'
import { TableList, ListHeaders, ListHeaderTitle, ListBody, ListBodyRow, ListBodyCol, ActionButton, EmptyList } from 'components/style/tableList'
import { Screen } from 'components/style'

class DoacaoRecorrenteList extends React.Component {
  componentDidMount() {
    this.props.loadAnuncios()
  }

  renderBodyRow = (anuncio) => (
    <ListBodyRow key={anuncio.id}>
      <ListBodyCol first format="text">
        {anuncio.contrato.nome}
      </ListBodyCol>
      <ListBodyCol format="datetime">{anuncio.dataInicioReserva}</ListBodyCol>
      <ListBodyCol format="datetime">{anuncio.dataFimReserva}</ListBodyCol>
      <ListBodyCol format="datetime">{anuncio.dataInicioEntrega}</ListBodyCol>
      <ListBodyCol format="datetime">{anuncio.dataFimEntrega}</ListBodyCol>
      <ListBodyCol last format="actionButtons">
        <ActionButton to={`/doacao/anuncio/editar/${anuncio.id}`} classes="mr-sm-1" icon={faPen} />
        <ActionButton to={`/doacao/reserva/novo/${anuncio.id}`} icon={faCalendarCheck} />
      </ListBodyCol>
    </ListBodyRow>
  )

  renderList = (list) => (
    <TableList>
      <ListHeaders>
        <ListHeaderTitle>Anúncio</ListHeaderTitle>
        <ListHeaderTitle className="mobile">Inicio Reserva</ListHeaderTitle>
        <ListHeaderTitle className="mobile">Fim Reserva</ListHeaderTitle>
        <ListHeaderTitle className="mobile">Inicio Entrega</ListHeaderTitle>
        <ListHeaderTitle className="mobile">Fim Entrega</ListHeaderTitle>
      </ListHeaders>
      <ListBody>{list.map((anuncio) => this.renderBodyRow(anuncio))}</ListBody>
    </TableList>
  )

  render() {
    const { list, isLoading, connection, dispatch } = this.props

    if (connection) {
      return <Refresh error={connection} dispatch={dispatch} />
    }

    if (isLoading === true) {
      return <Loading />
    }

    if (list !== undefined && list.constructor === Array && list.length > 0) {
      return (
        <Screen back={{ to: '/', title: 'Menu' }}>
          <Container fluid>{this.renderList(list)}</Container>
        </Screen>
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
  list: state.doacaoAnuncio.list,
  isLoading: state.doacaoAnuncio.isLoading,
  connection: state.main.connection,
})
const mapDispatchToProps = { loadAnuncios }
export default connect(mapStateToProps, mapDispatchToProps)(DoacaoRecorrenteList)
