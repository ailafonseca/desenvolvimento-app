import React from 'react'

export default class EmptyList extends React.Component {
  render () {
    return (
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-auto'>
            <h1 className='mt-4 mb-4'>Não há itens a serem exibidos</h1>
          </div>
        </div>
      </div>
    )
  }
}
