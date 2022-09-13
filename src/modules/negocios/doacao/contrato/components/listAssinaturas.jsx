import React, { useEffect, useState } from 'react'
import Proptypes from 'prop-types'
import _ from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import { isArrayEmpty } from 'util/utils'

function ListAssinaturas ({ assinantes, onRemoveAssinatura }) {
  const [ass, setAss] = useState(assinantes)

  useEffect(() => {
    setAss(_.orderBy(assinantes, ['nomeEmpresa'], ['asc']))
  }, [assinantes])

  if (isArrayEmpty(assinantes)) {
    return <div className='form-control border-0'>Não há assinaturas atribuídas</div>
  }

  return (
    <table className='table table-hover table-sm'>
      <tbody>
        {ass.map((assinatura, i) => {
          const nomeEmpresa = assinatura.nomeEmpresa !== undefined ? assinatura.nomeEmpresa : assinatura.empresa.nomeEmpresa
          const idEmpresa = assinatura.idEmpresa !== undefined ? assinatura.idEmpresa : assinatura.empresa.idEmpresa
          return (
            <tr key={`lista-assinaturas-${assinatura.id}-${i}`}>
              <td className='align-middle'>{nomeEmpresa}</td>
              <td className='align-middle text-right'>
                <button type='button' className='btn btn-link btn-sm' onClick={() => onRemoveAssinatura(idEmpresa)}>
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

ListAssinaturas.propTypes = {
  assinantes: Proptypes.array.isRequired,
  onRemoveAssinatura: Proptypes.func.isRequired
}

export default ListAssinaturas
