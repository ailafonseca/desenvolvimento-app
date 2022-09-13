import React from 'react'
import Proptypes from 'prop-types'

const EtapaUm = ({ nome, setNome, descricao, setDescricao, ativo, setAtivo }) => (
  <>
    <h3 className='mt-2'>Contrato de venda</h3>
    <div className='form-group'>
      <h4>1. Dados do contrato</h4>
      <label htmlFor='nome'>Nome do contrato *</label>
      <input
        type='text'
        value={nome || ''}
        id='nome'
        name='nome'
        className='form-control'
        placeholder='Nome do Contrato'
        autoComplete='off'
        aria-describedby='Nome do contrato'
        required
        autoFocus
        onChange={(e) => setNome && setNome(e.target.value)}
      />
    </div>
    <div className='form-group'>
      <label htmlFor='descricao'>Descrição</label>
      <textarea
        id='Descricao'
        value={descricao || ''}
        name='Descricao'
        rows={8}
        maxLength={5000}
        className='form-control'
        placeholder='Faça uma breve descrição'
        autoComplete='off'
        required
        draggable='false'
        onChange={(e) => setDescricao && setDescricao(e.target.value)}
      />
      <div className='limit-chars-textarea'>
            Você pode digitar
        <span className={`charsRemaineds ${5000 - descricao.length === 0 ? 'text-danger' : 'text-success'}`}>{` ${
              descricao ? 5000 - descricao.length : 5000
            } `}
        </span>
            catacteres
      </div>
    </div>
    <div className='form-check'>
      <label className='form-check-label align-middle' htmlFor='Ativo'>
        <input className='form-check-input' type='checkbox' id='Ativo' name='Ativo' checked={ativo || false} onChange={() => setAtivo && setAtivo(!ativo)} />
            Ativo
      </label>
    </div>
    <div>
      <label>*Item obrigatório</label>
    </div>
  </>
)

EtapaUm.propTypes = {
  nome: Proptypes.string,
  setNome: Proptypes.func.isRequired,
  descricao: Proptypes.string,
  setDescricao: Proptypes.func.isRequired,
  ativo: Proptypes.bool,
  setAtivo: Proptypes.func.isRequired
}

export default EtapaUm
