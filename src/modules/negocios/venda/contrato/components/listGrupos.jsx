import React, { useEffect, useState } from 'react'
import Proptypes from 'prop-types'
import _ from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import { isArrayEmpty } from 'util/utils'

function getGrupos (grupos) {
  return grupos.map(g => {
    if (!g.nome && g.grupo) {
      g.nome = g.grupo.nome
    }
    if (!g.id && g.grupo) {
      g.id = g.grupo.id
    }
    return g
  })
}

function ListGrupos ({ grupos, onRemoveGrupo }) {
  const [grus, setGrus] = useState(grupos)

  useEffect(() => {
    setGrus(_.orderBy(getGrupos(grupos), ['nome'], ['asc']))
  }, [grupos])

  if (isArrayEmpty(grupos)) {
    return <div className='form-control border-0'>Não há grupos atribuídos</div>
  }

  return (
    <table className='table table-hover table-sm'>
      <tbody>
        {grus.map((grupo, i) => {
          const nomeGrupo = grupo.nome !== undefined ? grupo.nome : grupo.grupo.nome
          const idGrupo = grupo.id !== undefined ? grupo.id : grupo.grupo.id
          return (
            <tr key={i}>
              <td className='align-middle'>{nomeGrupo}</td>
              <td className='align-middle text-right'>
                <button type='button' className='btn btn-link btn-sm' onClick={() => onRemoveGrupo(idGrupo)}>
                  <FontAwesomeIcon icon={faTimes} color='#FF0000' size='sm' />
                </button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

ListGrupos.propTypes = {
  grupos: Proptypes.array.isRequired,
  onRemoveGrupo: Proptypes.func.isRequired
}

export default ListGrupos
