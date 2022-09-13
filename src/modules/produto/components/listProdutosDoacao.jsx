import React, { useState, useEffect } from 'react'
import Proptypes from 'prop-types'
import { Button, Row, Col } from 'react-bootstrap'
import Select from 'react-select'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import Alignment from 'components/Alignment'

import { opcoesUnidadeProdutoSelect, orderBy, produtosToSelect } from './functions'
import { EstoqueSwitch } from './index'

import { isArrayEmpty, isArrayNotEmpty, isNullOrEmpty } from 'util/utils'

const ExibirProdutoAberto = ({ produto, onChange, onRemove, isOpen }) => {
  const [unidadesOptions] = useState(opcoesUnidadeProdutoSelect())
  const { idProduto, unidade } = produto

  useEffect(() => {
    if (isNullOrEmpty(produto.unidade) && onChange) {
      onChange({ ...produto, unidade: 'KG' })
    }
  }, [produto, onChange])

  return (
    <td className={`inside-table ${isOpen ? 'table-opened' : 'table-closed'}`} key={`tb_produto_item_${idProduto}`}>
      <Select
        isSearchable={false}
        id={`unidade_${idProduto}`}
        key={`unidade_${idProduto}`}
        name='unidade'
        placeholder='Unidade'
        options={unidadesOptions}
        onChange={(e) => onChange({ ...produto, unidade: e.value })}
        value={{ value: unidade || 'KG', label: unidade || 'KG' }}
        className='styled-select-unidade'
        styles={{
          // Fixes the overlapping problem of the component
          menu: provided => ({ ...provided, zIndex: 9999 })
        }}
      />
    </td>
  )
}

ExibirProdutoAberto.propTypes = {
  produto: Proptypes.object.isRequired,
  onRemove: Proptypes.func.isRequired,
  onChange: Proptypes.func.isRequired
}

const ExibirProduto = ({ produto, removido, onChange, onRemove }) => {
  const [dados, setDados] = useState({ isOpen: true, unidade: 'KG', nomeProduto: '???', ...produto })

  useEffect(() => {
    setDados(prev => ({ ...prev, unidade: produto.unidade, nomeProduto: produto.nomeProduto || produto.produto.nomeProduto }))
  }, [produto])

  const { nomeProduto, unidade, isOpen, idProduto } = dados

  return (
    <tr className={` product-line-table ${dados.isOpen ? 'table-opened' : 'table-closed'}`}>
      <td>
        <Alignment vMiddle>
          <span className='float-left' onClick={() => setDados({ ...dados, isOpen: !isOpen })}>
            <strong className='d-inline-block'>{nomeProduto}</strong>
            <small className='compressed-value'>{`${unidade || 'KG'})`}</small>
          </span>
          <Button variant='light' style={{ marginLeft: 'auto' }} onClick={() => onRemove(idProduto)}>
            <FontAwesomeIcon icon={faTimes} color='#FF0000' size='sm' />
          </Button>
        </Alignment>
      </td>
      {dados.isOpen ? <ExibirProdutoAberto produto={dados} onChange={onChange} onRemove={onRemove} isOpen={isOpen} /> : null}
    </tr>
  )
}

ExibirProduto.propTypes = {
  produto: Proptypes.object.isRequired,
  onRemove: Proptypes.func.isRequired,
  onChange: Proptypes.func.isRequired,
  removido: Proptypes.bool
}

const ExibirProdutos = ({ produtos, onRemove, onChange }) => {
  if (isArrayNotEmpty(produtos)) {
    return (
      <table border='0' className='mt-4 mb-4 table table-sm table-borderless table-striped product-table'>
        <tbody>
          {produtos.map(p => <ExibirProduto key={p.idProduto} produto={p} onRemove={onRemove} onChange={onChange} />)}
        </tbody>
      </table>
    )
  }
  return null
}

ExibirProdutos.propTypes = {
  produtos: Proptypes.array.isRequired,
  onRemove: Proptypes.func.isRequired,
  onChange: Proptypes.func.isRequired
}

const SelectProdutos = ({ produtos, onAdd }) => (
  <Select
    id='select-produtos'
    value='0'
    name='select-produtos'
    placeholder={isArrayNotEmpty(produtos) ? 'Selecione o produto...' : 'Não há produtos para adicionar'}
    options={produtos}
    isDisabled={isArrayEmpty(produtos)}
    cacheOptions
    defaultOptions
    searchable
    onChange={item => onAdd(item.value)}
    styles={{
      // Fixes the overlapping problem of the component
      menu: provided => ({ ...provided, zIndex: 9999 })
    }}
  />
)

function ListarProdutos({ cadastrados, selecionados, onAdd, onRemove, onChange, isEstoque, onChangeEstoque }) {
  const [cadastradosOrdenados, setCadastradosOrdenados] = useState([])
  const [selecionadosOrdenados, setSelecionadosOrdenados] = useState([])

  useEffect(() => {
    if (isArrayNotEmpty(selecionados)) {
      setSelecionadosOrdenados(orderBy(selecionados))
    } else {
      setSelecionadosOrdenados([])
    }
    if (isArrayNotEmpty(cadastrados)) {
      setCadastradosOrdenados(produtosToSelect(orderBy(cadastrados.filter(produto => !selecionados.some(s => s.idProduto === produto.idProduto)))))
    } else {
      setCadastradosOrdenados([])
    }
  }, [selecionados, cadastrados])

  if (isArrayNotEmpty(cadastrados)) {
    return (
      <Row>
        <EstoqueSwitch
          isEstoque={isEstoque}
          onChangeEstoque={onChangeEstoque}
        />
        <Col>
          <SelectProdutos produtos={cadastradosOrdenados} onAdd={onAdd} />
          {isArrayEmpty(selecionadosOrdenados) ? <p><br />Não há produtos selecionados para listar</p> : null}
          <ExibirProdutos produtos={selecionadosOrdenados} onChange={onChange} onRemove={onRemove} />
          {isArrayNotEmpty(selecionadosOrdenados) ? <SelectProdutos produtos={cadastradosOrdenados} onAdd={onAdd} /> : null}
        </Col>
      </Row>
    )
  }

  return (<>Não existem produtos disponiveis para cadastro</>)
}

ListarProdutos.propTypes = {
  cadastrados: Proptypes.array.isRequired,
  selecionados: Proptypes.array,
  onAdd: Proptypes.func.isRequired,
  onRemove: Proptypes.func.isRequired,
  onChange: Proptypes.func.isRequired,
  isEstoque: Proptypes.bool.isRequired,
  onChangeEstoque: Proptypes.func.isRequired
}

export default ListarProdutos
