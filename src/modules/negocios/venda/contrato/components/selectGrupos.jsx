import React from 'react'
import Select from 'react-select'

class SelectGrupos extends React.Component {
  render () {
    const { grupos, onAddGrupo } = this.props

    if (grupos !== undefined && grupos.constructor === Array && grupos.length > 0) {
      const optionsGrupos = grupos.map((item) => {
        return { value: item.id, label: item.nome }
      })

      return (
        <Select
          id='grupo'
          value='0'
          name='grupo'
          placeholder='Selecione o grupo...'
          options={optionsGrupos}
          searchable
          onChange={onAddGrupo}
          noOptionsMessage={() => 'Grupo não existe'}
          styles={{
            // Fixes the overlapping problem of the component
            menu: provided => ({ ...provided, zIndex: 9999 })
          }}
        />
      )
    }

    return <Select id='grupo' value='0' name='grupo' placeholder='Selecione o grupo...' options={[{ value: '0', label: '-' }]} searchable isDisabled />
  }
}

export default SelectGrupos
