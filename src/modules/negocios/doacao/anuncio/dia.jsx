import React from 'react'
import { connect } from 'react-redux'
import Loading from 'components/loading'
import { TableList, ListHeaders, ListHeaderTitle, ListBody, ListBodyRow, ListBodyCol } from 'components/style/tableList'
import URL from '../urls-browser'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBullhorn } from '@fortawesome/free-solid-svg-icons'
import { DisplayStringLimit } from 'util/display'
import { redirectToContratoDoDia } from './action'

class DoacaoRecorrenteAnuncioNovo extends React.Component {
  componentDidMount () {
    const { dispatch, redirectToContratoDoDia } = this.props
    dispatch(redirectToContratoDoDia())
  }

  upvotes = (e) => {
    const { history } = this.props
    e.preventDefault()
    history.push('/contrato/listar')
  };

  renderNovoAnuncio = (line) => (
    <Link to={URL.ANUNCIO.EDITAR(line.id)} className='btn-secondary btn-lg mobile'>
      Novo Anúncio
    </Link>
  );

  renderNovoAnuncioMobile = (line) => (
    <Link to={URL.ANUNCIO.EDITAR(line.id)} className='btn-secondary btn-lg botao2 button2'>
      <FontAwesomeIcon icon={faBullhorn} size='1x' />
    </Link>
  );

  renderBodyRow (line) {
    const nome = DisplayStringLimit(line.nome, 15)

    return (
      <ListBodyRow key={line.id}>
        <ListBodyCol first format='text'>
          {nome}
        </ListBodyCol>
        <ListBodyCol last format='actionButtons'>
          <span> {this.renderNovoAnuncio(line)}</span>
          <span> {this.renderNovoAnuncioMobile(line)}</span>
        </ListBodyCol>
      </ListBodyRow>
    )
  }

  renderList (listDia) {
    return (
      <div className='container-fluid'>
        <TableList>
          <ListHeaders>
            <ListHeaderTitle>Contrato</ListHeaderTitle>
          </ListHeaders>
          <ListBody>{listDia.map((item) => this.renderBodyRow(item))}</ListBody>
        </TableList>

      </div>
    )
  }

  render () {
    const { isLoading, diaFailure, listDia } = this.props

    if (diaFailure) {
      return (
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-auto'>
              <h1 className='mt-4 mb-4'>Contratos não localizados</h1>
              <p className='text-center'>
                Vá a lista de contratos{' '}
                <a href='/#' onClick={(e) => this.upvotes(e)}>
                  clicando aqui
                </a>{' '}
                e adicione a um dos contratos o dia de hoje.
              </p>
            </div>
          </div>
        </div>
      )
    }
    if (isLoading) {
      return (
        <Loading hasPercent responseMs={400}>
          <h3>Por favor, aguarde! Estamos localizando os contratos...</h3>
        </Loading>
      )
    }
    return (
      <div>
        {this.renderList(listDia)}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.doacaoAnuncio.isLoading,
  diaFailure: state.doacaoAnuncio.diaFailure,
  listDia: state.doacaoAnuncio.listDia
})

const mapDispatchToProps = (dispatch) => ({ dispatch, redirectToContratoDoDia })
export default connect(mapStateToProps, mapDispatchToProps)(DoacaoRecorrenteAnuncioNovo)
