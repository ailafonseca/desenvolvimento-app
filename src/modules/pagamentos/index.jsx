import React from 'react'
import Proptypes from 'prop-types'
import Select from 'react-select'
import _ from 'lodash'

import { isArrayEmpty } from 'util/utils'

const orderByName = (formasDePagamento) => _.orderBy(formasDePagamento, ['nome'], ['asc'])
const toOption = (formasDePagamento) => formasDePagamento.map((item) => ({ value: item.idFormaPagamento, label: item.nome }))

function SelectFormasDePagamento ({ formasDePagamento, onAdd }) {
  return (
    <Select
      id='select_forma_de_pagamento'
      value='0'
      name='select_forma_de_pagamento'
      placeholder='Selecione a forma de pagamento...'
      options={toOption(orderByName(formasDePagamento))}
      searchable
      onChange={onAdd}
      noOptionsMessage={() => 'Pagamento não existe'}
      isDisabled={isArrayEmpty(formasDePagamento)}
      styles={{
        // Fixes the overlapping problem of the component
        menu: provided => ({ ...provided, zIndex: 9999 })
      }}
    />
  )
}

SelectFormasDePagamento.propTypes = {
  formasDePagamento: Proptypes.array.isRequired,
  onAdd: Proptypes.func.isRequired
}

export {
  SelectFormasDePagamento,
  orderByName as OrderByFormaDePagamento
}
