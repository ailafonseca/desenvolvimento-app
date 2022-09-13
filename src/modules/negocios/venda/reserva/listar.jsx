import React from 'react'
import { connect } from 'react-redux'
import { Container, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { loadVitrine } from './action'
import { DisplayStringLimit, DisplayString } from 'util/display'
// import List from "components/listVendas";
import Loading from 'components/loading'
import Refresh from 'components/refresh'
import { TableList, ListHeaders, ListHeaderTitle, ListBody, ListBodyRow, ListBodyCol, ActionButton, EmptyList } from 'components/style/tableList'
import { faEdit, faShareAlt, faPen } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import { Screen } from 'components/style'
class ReservaList extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(loadVitrine())
  }

  renderBodyRow = (anuncio) => (
    <ListBodyRow key={anuncio.id}>
      <ListBodyCol first format="text">
        {anuncio.contrato.nome}
      </ListBodyCol>
      {/* <ListBodyCol>{`${anuncio.empresa.nome}`}</ListBodyCol> */}
      <ListBodyCol format="datetime">{anuncio.dataInicioReserva}</ListBodyCol>
      <ListBodyCol format="datetime">{anuncio.dataFimReserva}</ListBodyCol>
      <ListBodyCol format="datetime">{anuncio.dataInicioEntrega}</ListBodyCol>
      <ListBodyCol format="datetime">{anuncio.dataFimEntrega}</ListBodyCol>
      <ListBodyCol last format="actionButtons">
        <ActionButton to={`/venda/reserva/editar/${anuncio.reservas[0].id}?isEdit=true`} icon={faPen} hidden={!anuncio.reservas.length} />
        {/* <Button color="primary" className="px-2" onClick={() => shareInfo(anuncio)}>
            <FontAwesomeIcon icon={faShareAlt} />
          </Button>      */}
      </ListBodyCol>
    </ListBodyRow>
  )

  renderListReservaList = (list) => (
    <TableList>
      <ListHeaders>
        <ListHeaderTitle>Reserva</ListHeaderTitle>
        {/* <ListHeaderTitle>Empresa</ListHeaderTitle> */}
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

    console.log(list)
    if (connection) {
      return <Refresh error={connection} dispatch={dispatch} />
    }

    if (isLoading === true) {
      return <Loading />
    } else if (list !== undefined && list.constructor === Array && list.length > 0) {
      return (
        <Screen back={{ to: '/', title: 'Menu' }}>
          <Container fluid>{this.renderListReservaList(list)}</Container>
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
const products = [
  {
    id: '4078af87-80e5-4120-8d8c-e02158f87bf8',
    idAnuncioProduto: '6499f28a-5a12-457b-2aa7-08d9843a233b',
    anuncioProduto: {
      id: '6499f28a-5a12-457b-2aa7-08d9843a233b',
      idProduto: '00907083-d00c-4d8e-b2fa-50ddd80f8669',
      unidade: 'KG',
      quantidade: 2,
      valor: 0,
      nomeProduto: 'ABACATE KG',
      reservado: 1,
    },
    idReservaInteracao: 'aa87dfa6-b38a-4283-9fdb-57ff3a10ebab',
    idProduto: '00907083-d00c-4d8e-b2fa-50ddd80f8669',
    produto: {
      idProduto: '00907083-d00c-4d8e-b2fa-50ddd80f8669',
      codigoInterno: '37338',
      nomeProduto: 'ABACATE KG',
      descricaoProduto: '37334',
      pesoBruto: 0,
      idEmpresa: '9dfec900-a82f-435d-b89d-84bd95454d16',
      estoque: 0,
      imagens: [],
    },
    unidade: 'KG',
    nomeProduto: 'ABACATE KG',
    quantidade: 1,
    valor: 0,
  },
]
function shareInfo(reserva) {
  let shareText = `Dados do Anuncio: \n\nReserva: ${reserva.contrato.nome} \n`
  const reserveText = `Reserva inicia em: ${moment(reserva.dataInicioReserva).format('DD/MM/YY')} e termina em ${moment(reserva.dataInicioReserva).format('DD/MM/YY [as] H:mm')} \n`
  const deliveryText = `Entrega inicia em ${moment(reserva.dataInicioEntrega).format('DD/MM/YY')} e termina em ${moment(reserva.dataInicioEntrega).format(
    'DD/MM/YY [as] H:mm'
  )} \n\n`
  shareText += reserveText + deliveryText + 'Produtos: \n'
  products.forEach((produto) => {
    shareText += `${produto.nomeProduto} - ${produto.quantidade}${produto.unidade}  ${produto.valor ? `R$ ${produto.valor * produto.quantidade}` : 'Sem valor'} \n`
  })
  const shareUrl = `${window.location.origin}/doacao/reserva/novo/${reserva.id} `
  shareText += `Para acessar, utilize o seguinte link: ${shareUrl}`
  console.log(shareText)
}
const mapStateToProps = (state) => ({
  list: state.vendaVitrine.list,
  isLoading: state.vendaVitrine.isLoading,
  connection: state.main.connection,
})
const mapDispatchToProps = (dispatch) => ({ dispatch, DisplayStringLimit, DisplayString })
export default connect(mapStateToProps, mapDispatchToProps)(ReservaList)
