import React from 'react'
import { Link } from 'react-router-dom'

const Sucesso = (props) => {
  const {
    match: {
      params: { type, id, segmento }
    }
  } = props
  const {
    match: {
      params: { page }
    }
  } = props
  let nome = ''
  let typendo = ""; // eslint-disable-line
  switch (page) {
    case 'anuncio':
      nome = 'Anúncio'
      break
    case 'contrato':
      nome = 'Contrato'
      break
    case 'reserva':
      nome = 'Reserva'
      break
    case 'coleta':
      nome = 'Coleta'
      break
    case 'entrega':
    case 'entrega-comprador':
    case 'entrega-anunciante':
      nome = 'Entrega'
      break
    case 'revisao':
      nome = 'Revisão'
      break
    case 'produto':
      nome = 'Produto'
      break
    default:
      nome = ''
      break
  }

  const segmento_editado = segmento === 'doacao' ? 'doação' : 'venda'

  switch (type) {
    case 'editar':
      typendo = 'editado'
      break
    case 'novo':
      typendo = 'cadastrado'
      break
    default:
      typendo = 'alterado'
      break
  }

  const acao = page === 'contrato' || page === 'anuncio' || page === 'produto' ? 'registrado' : 'registrada'

  return (
    <div className='container-success'>
      <div>
        <h1 className='text-center d-block'>{`${nome} de ${segmento_editado} ${acao} com sucesso!`}</h1>
        {page !== 'produto' && (page !== 'coleta' || segmento !== 'venda') && type && id && (
          <Link className='text-center d-block' to={`/${segmento}/${page}/editar/${id}`}>
            Editar {page.indexOf('/') > -1 ? page.split('/')[1] : page}
          </Link>
        )}{' '}
        {page !== 'produto' && type && id && (
          <Link className='text-center d-block' to={`/${segmento}/${page}/listar`}>
            Voltar para lista de {page.indexOf('/') > -1 ? page.split('/')[1] : page}
          </Link>
        )}{' '}
        {page === 'anuncio' && (
          <Link className='text-center d-block' to={`/${segmento}/contrato/listar`}>
            Voltar para lista de contrato
          </Link>
        )}{' '}
        {page === 'produto' && type && id && (
          <Link className='text-center d-block' to={`/${page}/${id}`}>
            Voltar para {page.indexOf('/') > -1 ? page.split('/')[1] : page}
          </Link>
        )}
      </div>
    </div>
  )
}

export default Sucesso
