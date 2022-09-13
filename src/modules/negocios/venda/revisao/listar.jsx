import React from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList } from '@fortawesome/free-solid-svg-icons'
import { Dropdown } from 'react-bootstrap'
import Loading from '../../../components/loading'

import { loadReservasDono, loadEmpresa } from '../entrega/action'

import { DisplayStringLimit, DisplayString, DisplayData, dateDayMonth } from 'util/display'

class anuncioVitrineList extends React.Component {
  constructor (props, context) {
    super(props, context)

    this.state = {
      carregado: false
    }
  }

  componentDidUpdate () {
    const { carregado } = this.state
    const { empresas, list, dispatch } = this.props

    if (carregado === false && empresas === undefined && Array.isArray(list) && list.length > 0) {
      dispatch(loadEmpresa(list[0].idEmpresa))
      this.setState({ carregado: true })
    }
  }

  componentDidMount () {
    const {
      match: { params },
      loadReservasDono,
      dispatch
    } = this.props
    const idVendaRecorrenteAnuncio = params.idVendaRecorrenteAnuncio

    dispatch(loadReservasDono(idVendaRecorrenteAnuncio))
  }

  renderEditar = (line) => <Dropdown.Item href={`/contrato/anuncio/revisao/editar/${line.idVendaRecorrenteAnuncio}`}>Ver detalhes</Dropdown.Item>;

  displayHorario = (inicio, fim) => {
    if (inicio !== undefined && inicio !== null && fim !== undefined && fim !== null) return `${inicio.substring(0, 5)}-${fim.substring(0, 5)}`
    return '-'
  };

  renderLine = (line) => {
    const { empresas } = this.props
    let nome = ''

    if (empresas !== undefined && Array.isArray(empresas)) {
      nome = DisplayString(empresas[0].RazaoSocial)
    } else if (line.anuncio.vendaRecorrente !== undefined && line.anuncio.vendaRecorrente !== null) nome = DisplayString(line.anuncio.vendaRecorrente.nome)

    return (
      <tr key={line.anuncio.idVendaRecorrenteAnuncio}>
        <td>{nome}</td>
        <td>{dateDayMonth(DisplayData(line.anuncio.data))}</td>
        <td className='d-none d-lg-table-cell'>{this.displayHorario(line.anuncio.inicioReserva, line.anuncio.fimReserva)}</td>
        <td className='d-none d-lg-table-cell'>{this.displayHorario(line.anuncio.inicioEntrega, line.anuncio.fimEntrega)}</td>
        <td className='text-right'>
          <Dropdown size='sm'>
            <Dropdown.Toggle size='sm' variant='primary' id='dropdown-basic'>
              <FontAwesomeIcon icon={faList} size='sm' />
            </Dropdown.Toggle>
            <Dropdown.Menu>{this.renderEditar(line)}</Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
    )
  };

  renderList (list) {
    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className='col'>{/* <h2 className="mt-4">Lista de reservas do anúncio</h2> */}</div>
        </div>
        <div className='table-responsive'>
          <table className='table table-striped table-hover table-sm'>
            <thead>
              <tr>
                <th scope='col'>Doação Recorrente</th>
                <th scope='col'>Data</th>
                <th scope='col' className='d-none d-lg-table-cell'>
                  Reserva
                </th>
                <th scope='col' className='d-none d-lg-table-cell'>
                  Entrega
                </th>
                <th scope='col' className='text-right' />
              </tr>
            </thead>
            <tbody>{list.map((item) => this.renderLine(item))}</tbody>
          </table>
        </div>
      </div>
    )
  }

  render () {
    const { list, isLoading } = this.props

    if (isLoading === true) return <Loading />
    else if (list !== undefined && list.constructor === Array && list.length > 0) return this.renderList(list)
    return (
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-auto'>
            <h1 className='mt-4 mb-4'>Não há itens a serem exibidos</h1>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  list: state.vendaReserva.listDonos,
  empresas: state.vendaReserva.empresa,
  isLoading: state.vendaReserva.isLoading
})
const mapDispatchToProps = (dispatch) => ({
  dispatch,
  DisplayStringLimit,
  DisplayString,
  loadReservasDono
})
export default connect(mapStateToProps, mapDispatchToProps)(anuncioVitrineList)
