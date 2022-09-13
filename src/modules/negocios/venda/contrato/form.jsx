import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'

const loginForm = props => {
  const { handleSubmit, pristine, submitting, invalid } = props

  return (
    <div className='row'>
      <div className='col-sm-9 col-md-7 col-lg-5 mx-auto'>
        <div className='card card-signin my-5'>
          <div className='card-body'>
            <h5 className='card-title text-center'>Login</h5>
            <form onSubmit={handleSubmit} className='form-signin'>
              <div className='form-label-group'>
                <label htmlFor='cpf'>CPF</label>
                <Field component='input' type='text' name='inputCpf' className='form-control' placeholder='CPF' required autoFocus />
              </div>
              <br />
              <div className='form-label-group'>
                <label htmlFor='inputPassword'>Senha</label>
                <Field component='input' type='password' name='inputPassword' className='form-control' placeholder='Senha' required />
              </div>
              <hr className='my-4' />
              <button className='btn btn-lg btn-primary btn-block text-uppercase' type='submit' disabled={pristine || submitting || invalid}>Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

var reduxChangePasswordForm = reduxForm({ form: 'Login' })(loginForm)

const mapStateToProps = state => ({})
const mapDispatchToProps = {}
export default connect(mapStateToProps, mapDispatchToProps)(reduxChangePasswordForm)
