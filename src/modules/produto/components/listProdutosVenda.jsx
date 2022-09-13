import React, { useState, useEffect } from 'react'
import Proptypes from 'prop-types'
import { Button, Row, Col } from 'react-bootstrap'
import Select from 'react-select'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import Alignment from 'components/Alignment'
import InputNumber from 'components/input/inputNumberConfirm'

import { opcoesUnidadeProdutoSelect, orderBy, produtosToSelect } from './functions'
import { EstoqueSwitchComPreco } from './index'

import { isArrayEmpty, isArrayNotEmpty, isNullOrEmpty, getNumberPositiveOrZero } from 'util/utils'

const ExibirProdutoAberto = ({ produto, onChange, onRemove, isOpen, isPrecoProduto }) => {
  const [unidadesOptions] = useState(opcoesUnidadeProdutoSelect())
  const { idProduto, unidade, preco } = produto
  const valor = isPrecoProduto ? 0 : preco || ''

  useEffect(() => {
    if (isNullOrEmpty(produto.unidade) && onChange) {
      onChange({ ...produto, unidade: 'KG' })
    }
  }, [produto, onChange])

  return (
    <td className={`inside-table ${isOpen ? 'table-opened' : 'table-closed'}`} key={`tb_produto_item_${idProduto}`}>
      <Row>
        <Col>
          Unidade
          <Select
            isSearchable={false}
            id={`unidade_${idProduto}`}
            key={`unidade_${idProduto}`}
            name='unidade'
            placeholder='Unidade'
            options={unidadesOptions}
            onChange={(e) => onChange({ ...produto, unidade: e.value })}
            value={{ value: unidade || 'KG', label: unidade || 'KG' }}
            isDisabled={isPrecoProduto}
            className='styled-select-unidade'
            styles={{
              // Fixes the overlapping problem of the component
              menu: provided => ({ ...provided, zIndex: 9999 })
            }}
          />
        </Col>
        <Col>
          Preço
          <InputNumber
            type='number'
            id={`preco_${idProduto}`}
            className='form-control py-1 w-100 nospin'
            style={{ minHeight: '38px' }}
            valor={valor}
            min={0}
            mobile
            precision={2}
            onChange={(e) => !isPrecoProduto && onChange({ ...produto, preco: getNumberPositiveOrZero(e) })}
            disabled={isPrecoProduto}
          />
        </Col>
      </Row>
      <Row>&nbsp;</Row>
    </td>
  )
}

ExibirProdutoAberto.propTypes = {
  produto: Proptypes.object.isRequired,
  onRemove: Proptypes.func.isRequired,
  onChange: Proptypes.func.isRequired,
  isPrecoProduto: Proptypes.bool.isRequired
}

const ExibirProduto = ({ produto, removido, onChange, onRemove, isPreco }) => {
  const [dados, setDados] = useState({ isOpen: true, unidade: 'KG', nomeProduto: '???', preco: produto.precoBase ? produto.precoBase : 0, ...produto })

  useEffect(() => {
    setDados(prev => ({ ...prev, preco: produto.preco, unidade: produto.unidade, nomeProduto: produto.nomeProduto || produto.produto.nomeProduto }))
  }, [produto])

  const { nomeProduto, unidade, isOpen, preco, idProduto } = dados

  return (
    <tr className={` product-line-table ${dados.isOpen ? 'table-opened' : 'table-closed'}`}>
      <td colSpan='12'>
        <Alignment vMiddle>
          <span className='float-left' onClick={() => setDados({ ...dados, isOpen: !isOpen })}>
            <strong className='d-inline-block'>{nomeProduto}</strong>
            <small className='compressed-value'>{` (${preco || '0'} ${unidade || 'KG'})`}</small>
          </span>
          <Button variant='light' style={{ marginLeft: 'auto' }} onClick={() => onRemove(idProduto)}>
            <FontAwesomeIcon icon={faTimes} color='#FF0000' size='sm' />
          </Button>
        </Alignment>
      </td>
      {dados.isOpen ? <ExibirProdutoAberto produto={dados} onChange={onChange} onRemove={onRemove} isOpen={isOpen} isPrecoProduto={isPreco} /> : null}
    </tr>
  )
}

ExibirProduto.propTypes = {
  produto: Proptypes.object.isRequired,
  onRemove: Proptypes.func.isRequired,
  onChange: Proptypes.func.isRequired,
  removido: Proptypes.bool,
  isPreco: Proptypes.bool.isRequired
}

const ExibirProdutos = ({ produtos, onRemove, onChange, isPreco }) => {
  if (isArrayNotEmpty(produtos)) {
    return (
      <table border='0' className='mt-4 mb-4 table table-sm table-borderless table-striped product-table'>
        <tbody>
          {produtos.map(p => <ExibirProduto key={p.idProduto} produto={p} onRemove={onRemove} onChange={onChange} isPreco={isPreco} />)}
        </tbody>
      </table>
    )
  }
  return null
}

ExibirProdutos.propTypes = {
  produtos: Proptypes.array.isRequired,
  onRemove: Proptypes.func.isRequired,
  onChange: Proptypes.func.isRequired,
  isPreco: Proptypes.bool.isRequired
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

function ListarProdutos ({ cadastrados, selecionados, onAdd, onRemove, onChange, isEstoque, isPreco, onChangeEstoque, onChangePreco }) {
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
        <EstoqueSwitchComPreco
          isEstoque={isEstoque}
          onChangeEstoque={onChangeEstoque}
          isPreco={isPreco}
          onChangePreco={onChangePreco}
        />
        <Col>
          <SelectProdutos produtos={cadastradosOrdenados} onAdd={onAdd} />
          {isArrayEmpty(selecionadosOrdenados) ? <p><br />Não há produtos selecionados para listar</p> : null}
          <ExibirProdutos produtos={selecionadosOrdenados} onChange={onChange} onRemove={onRemove} isPreco={isPreco} />
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
  isPreco: Proptypes.bool.isRequired,
  onChangeEstoque: Proptypes.func.isRequired,
  onChangePreco: Proptypes.func.isRequired
}

export default ListarProdutos
