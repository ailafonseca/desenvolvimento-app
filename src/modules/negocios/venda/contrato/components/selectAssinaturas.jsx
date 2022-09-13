import React from 'react'
import Select from 'react-select'

class SelectAssinaturas extends React.Component {
  render () {
    const { assinantes, onAddAssinatura } = this.props

    if (assinantes !== undefined && assinantes.constructor === Array && assinantes.length > 0) {
      const optionsAssinaturas = assinantes.map((item) => { return { label: item.nomeEmpresa, value: item.idEmpresa } })
      return (
        <div className='wrap-contract-type'>
          <div className='row'>
            <div className='col-sm-12'>
              <Select
                id='assinatura'
                value='0'
                searchable
                onChange={onAddAssinatura}
                placeholder='Selecione a assinatura...'
                options={optionsAssinaturas}
                noOptionsMessage={() => 'Por favor, selecione uma assinatura'}
                styles={{
                  // Fixes the overlapping problem of the component
                  menu: provided => ({ ...provided, zIndex: 9999 })
                }}
              />
            </div>
          </div>
        </div>
      )
    }

    console.log('Não tem assinaturas no selectAssinaturas, ', assinantes)
    return (
      <Select
        id='assinatura'
        value='0'
        name='assinatura'
        placeholder='Selecione a assinatura...'
        options={[{ value: '0', label: '-' }]}
        searchable
        isDisabled
        styles={{
        // Fixes the overlapping problem of the component
          menu: provided => ({ ...provided, zIndex: 9999 })
        }}
      />
    )
  }
}

export default SelectAssinaturas
