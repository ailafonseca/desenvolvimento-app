import React, { useState, useEffect } from 'react'
import Proptypes from 'prop-types'

import SelectAssinaturas from './selectAssinaturas'
import SelectGrupos from './selectGrupos'
import ListAssinaturas from './listAssinaturas'
import ListGrupos from './listGrupos'

function Etapa2Assinantes ({ assinados, todos, onAddAssinatura, onRemoveAssinatura, onAddGrupo, onRemoveGrupo }) {
  const [assinaturasDisponiveis, setAssinaturas] = useState()
  const [gruposDisponiveis, setGrupos] = useState()

  useEffect(() => {
    setAssinaturas(todos.assinaturas.filter(x => !assinados.assinaturas.some(k => k.idEmpresa === x.idEmpresa)))
  }, [todos.assinaturas, assinados.assinaturas])

  useEffect(() => {
    setGrupos(todos.grupos.filter(x => !assinados.grupos.some(k => (k.idGrupo || k.id) === x.id)))
  }, [todos.grupos, assinados.grupos])

  return (
    <form className='form marginPagamentoContrato'>
      <div className='card container'>
        <div className='card-body'>
          <h3>Contrato de Doação</h3>

          <h4>2. Assinatura</h4>

          <div className='margin'>
            <label>Selecione a outra parte do contrato *</label>
            <SelectAssinaturas assinantes={assinaturasDisponiveis} onAddAssinatura={onAddAssinatura} />
          </div>

          <div className='form-group margin'>
            <label>Assinaturas atribuídas</label>
            <ListAssinaturas assinantes={assinados.assinaturas} onRemoveAssinatura={onRemoveAssinatura} />
          </div>

          <div className='form-group margin'>
            <label>Adicionar grupo *</label>
            <SelectGrupos grupos={gruposDisponiveis} onAddGrupo={onAddGrupo} />
          </div>

          <div className='form-group'>
            <label>Grupos atribuídos</label>
            <ListGrupos grupos={assinados.grupos} onRemoveGrupo={onRemoveGrupo} />
          </div>

          <div>
            <label>*É obrigatório o preenchimento ao menos um dos itens, empresa ou grupo.</label>
          </div>
        </div>
      </div>
    </form>
  )
}

Etapa2Assinantes.propTypes = {
  assinados: Proptypes.shape(
    {
      assinaturas: Proptypes.array,
      grupos: Proptypes.array
    }
  ).isRequired,
  todos: Proptypes.shape(
    {
      assinaturas: Proptypes.array.isRequired,
      grupos: Proptypes.array.isRequired
    }
  ).isRequired,
  onAddAssinatura: Proptypes.func.isRequired,
  onRemoveAssinatura: Proptypes.func.isRequired,
  onAddGrupo: Proptypes.func.isRequired,
  onRemoveGrupo: Proptypes.func.isRequired
}

export default Etapa2Assinantes
