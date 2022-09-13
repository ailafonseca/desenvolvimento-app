import React, { useState, useEffect } from 'react'
import Proptypes from 'prop-types'
import { Card } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import Select from 'react-select'

import { isArrayEmpty, isNullOrEmpty } from 'util/utils'

import { SelectFormasDePagamento, OrderByFormaDePagamento } from 'modules/pagamentos'
import TiposChavePix from 'modules/pagamentos/tiposChavePix'

function ListarFormaDePagamentoPix ({ formaDePagamento: { idFormaPagamento, formaDePagamento, dados }, onRemove, onChange }) {
  const [d, setD] = useState({ tipoDeChave: '', chave: '' })

  useEffect(() => {
    setD({ tipoDeChave: '', chave: '', ...dados })
  }, [dados])

  if (!formaDePagamento) {
    return (<Card>Forma de pagamento errada</Card>)
  }

  return (
    <Card
      key={`card-produto-${idFormaPagamento}`}
      style={{
        width: '100%',
        padding: '5px',
        margin: '0px'
      }}
    >
      <Card.Body
        style={{
          width: '100%',
          padding: '5px',
          margin: '0px'
        }}
      >
        Pix
        <button type='button' className='btn btn-link btn-sm' onClick={() => onRemove(idFormaPagamento)}>
          <FontAwesomeIcon icon={faTimes} color='#FF0000' size='sm' />
        </button>
        <br />
        <label htmlFor='tipoChave'>Tipo de Chave:</label>&nbsp;
        <Select
          isSearchable
          name='tipoChave'
          id='tipoChave'
          placeholder='Selecione o tipo de chave'
          aria-describedby='Tipo de Chave'
          defaultValue={d.tipoDeChave}
          onChange={e => onChange(idFormaPagamento, { ...dados, tipoDeChave: e.value })}
          styles={{
            // Fixes the overlapping problem of the component
            menu: provided => ({ ...provided, zIndex: 9999 })
          }}
          options={TiposChavePix}
        />
        <br />
        <label htmlFor='chave'>Chave:</label>&nbsp;
        <input id='chave' type='text' value={d.chave} onChange={e => onChange(idFormaPagamento, { ...dados, chave: e.target.value })} />
      </Card.Body>
    </Card>
  )
}

ListarFormaDePagamentoPix.propTypes = {
  formaDePagamento: Proptypes.object.isRequired,
  onRemove: Proptypes.func.isRequired,
  onChange: Proptypes.func.isRequired
}
function ListarFormaDePagamentoTransferencia ({ formaDePagamento: { idFormaPagamento, formaDePagamento, dados }, onRemove, onChange }) {
  const [d, setD] = useState({ banco: '', codigoBanco: '', agencia: '', conta: '' })

  useEffect(() => {
    setD({ banco: '', codigoBanco: '', agencia: '', conta: '', ...dados })
  }, [dados])

  if (!formaDePagamento) {
    return (<Card>Forma de pagamento errada</Card>)
  }

  return (
    <Card
      key={`card-produto-${idFormaPagamento}`}
      style={{
        width: '100%',
        padding: '5px',
        margin: '0px'
      }}
    >
      <Card.Body
        style={{
          width: '100%',
          padding: '5px',
          margin: '0px'
        }}
      >
        Transferência bancária
        <button type='button' className='btn btn-link btn-sm' onClick={() => onRemove(idFormaPagamento)}>
          <FontAwesomeIcon icon={faTimes} color='#FF0000' size='sm' />
        </button>
        <br />
        <label htmlFor='banco'>Banco:</label>&nbsp;
        <input id='banco' type='text' value={d.banco} onChange={e => onChange(idFormaPagamento, { ...dados, banco: e.target.value })} />
        <br />
        <label htmlFor='codbanco'>Código Banco:</label>&nbsp;
        <input id='codbanco' type='text' value={d.codigoBanco} onChange={e => onChange(idFormaPagamento, { ...dados, codigoBanco: e.target.value })} />
        <br />
        <label htmlFor='agencia'>Agencia:</label>&nbsp;
        <input id='agencia' type='text' value={d.agencia} onChange={e => onChange(idFormaPagamento, { ...dados, agencia: e.target.value })} />
        <br />
        <label htmlFor='conta'>Conta:</label>&nbsp;
        <input id='conta' type='text' value={d.conta} onChange={e => onChange(idFormaPagamento, { ...dados, conta: e.target.value })} />
      </Card.Body>
    </Card>
  )
}

ListarFormaDePagamentoTransferencia.propTypes = {
  formaDePagamento: Proptypes.object.isRequired,
  onRemove: Proptypes.func.isRequired,
  onChange: Proptypes.func.isRequired
}

function ListarFormaDePagamentoGererica ({ formaDePagamento: { idFormaPagamento, formaDePagamento }, onRemove, onChange }) {
  if (!formaDePagamento) {
    return (<Card>Forma de pagamento errada</Card>)
  }

  return (
    <Card
      key={`card-produto-${idFormaPagamento}`}
      style={{
        width: '100%',
        padding: '5px',
        margin: '0px'
      }}
    >
      <Card.Body
        style={{
          width: '100%',
          padding: '5px',
          margin: '0px'
        }}
      >
        {formaDePagamento.nome} - {formaDePagamento.prazo}
        <button type='button' className='btn btn-link btn-sm' onClick={() => onRemove(idFormaPagamento)}>
          <FontAwesomeIcon icon={faTimes} color='#FF0000' size='sm' />
        </button>
      </Card.Body>
    </Card>
  )
}

ListarFormaDePagamentoGererica.propTypes = {
  formaDePagamento: Proptypes.object.isRequired,
  onRemove: Proptypes.func.isRequired,
  onChange: Proptypes.func.isRequired
}

function ListarPagamentosSelecionados ({ formasDePagamentoSelecionadas, onRemove, onChange }) {
  const [selecionados, setSelecionados] = useState(formasDePagamentoSelecionadas)

  useEffect(() => {
    setSelecionados(OrderByFormaDePagamento(formasDePagamentoSelecionadas))
  }, [formasDePagamentoSelecionadas])

  if (isArrayEmpty(selecionados)) {
    return <div className='form-control border-0'>Não há pagamentos atribuídos</div>
  }

  return (
    <>
      {
        formasDePagamentoSelecionadas.map(fp => {
          let id = fp.id

          if (isNullOrEmpty(id)) { id = fp.formaDePagamento.id }

          switch (id.toUpperCase()) {
            case 'A1E8DA6B-659D-4069-811A-12B4AD644D3A':
              return (<ListarFormaDePagamentoTransferencia key={id} formaDePagamento={fp} onRemove={onRemove} onChange={onChange} />)
            case '2AF5FC90-50CE-4319-87B5-3C4FD92A9E43':
              return (<ListarFormaDePagamentoPix key={id} formaDePagamento={fp} onRemove={onRemove} onChange={onChange} />)
            default:
              return (<ListarFormaDePagamentoGererica key={id} formaDePagamento={fp} onRemove={onRemove} onChange={onChange} />)
          }
        })
      }
    </>
  )
}

ListarPagamentosSelecionados.propTypes = {
  formasDePagamentoSelecionadas: Proptypes.array,
  onRemove: Proptypes.func.isRequired,
  onChange: Proptypes.func.isRequired
}

function ExibirComboFormasDePagamento ({ formasDePagamentoSelecionadas, formasDePagamento, onAdd }) {
  if (isArrayEmpty(formasDePagamentoSelecionadas) || isArrayEmpty(formasDePagamento)) {
    return <SelectFormasDePagamento formasDePagamento={formasDePagamento || []} onAdd={onAdd} />
  }

  const formasDePagamentoNaoSelecionadas = formasDePagamento.filter(x => !formasDePagamentoSelecionadas.some(s => s.idFormaPagamento === x.idFormaPagamento || s.id === x.id))

  return <SelectFormasDePagamento formasDePagamento={formasDePagamentoNaoSelecionadas || []} onAdd={onAdd} />
}

ExibirComboFormasDePagamento.propTypes = {
  formasDePagamentoSelecionadas: Proptypes.array,
  formasDePagamento: Proptypes.array.isRequired,
  onAdd: Proptypes.func.isRequired
}

const RenderEtapaPage = ({ formasDePagamentoSelecionadas, formasDePagamento, onAdd, onRemove, onChange }) => (
  <form className='form marginPagamentoContrato'>
    <div className='card container'>
      <div className='card-body'>
        <h3>Contrato de venda</h3>
        <h4>3. Formas de Pagamento</h4>
        <div className='margin'>
          <div className='form-group'>
            <label>Adicionar Pagamento (obrigatório)</label>
            {ExibirComboFormasDePagamento({ formasDePagamentoSelecionadas, formasDePagamento, onAdd })}
          </div>
        </div>
        <div className='form-group'>
          <label><strong>Pagamentos atribuídos</strong></label>
          <ListarPagamentosSelecionados formasDePagamentoSelecionadas={formasDePagamentoSelecionadas} onRemove={onRemove} onChange={onChange} />
        </div>
      </div>
    </div>
  </form>
)

RenderEtapaPage.propTypes = {
  formasDePagamentoSelecionadas: Proptypes.array,
  formasDePagamento: Proptypes.array.isRequired,
  onAdd: Proptypes.func.isRequired,
  onRemove: Proptypes.func.isRequired,
  onChange: Proptypes.func.isRequired
}

export default RenderEtapaPage
