import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

class ReviewInfo extends Component {
  static propTypes = {
    send: PropTypes.object.isRequired,
    onSuccess: PropTypes.func.isRequired,
    action: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    token: PropTypes.string
  };

  constructor (props) {
    super(props)

    this.state = {
      loading: false
    }
  }

  handleSubmit (e) {
    const {
      send,
      onSuccess,
      action,
      dispatch,
      token,
      afterSubmit
    } = this.props
    e.preventDefault()

    const successCallback = (resp) => {
      this.setState({ loading: false }, () => onSuccess(resp))
    };

    const failureCallback = (err) => {
      console.log('erro', err)
    };

    this.setState({ loading: true }, () => {
      if (token) {
        return dispatch(action(token, send, successCallback, failureCallback)).then(() => {
          this.setState({ loading: false })
          return afterSubmit ? afterSubmit() : successCallback()
        })
      }
      return dispatch(action(send, successCallback, failureCallback)).then(() => {
        this.setState({ loading: false })
        return afterSubmit ? afterSubmit() : failureCallback()
      })
    })
  }

  render () {
    const { loading } = this.state
    const { data, back } = this.props

    return (
      <form ref={this.form} onSubmit={(e) => this.handleSubmit(e)}>
        <h1>Confirmar dados</h1>
        {Object.values(data).map((item) => (
          <div key={item.label}>
            {item.value !== '' ? `${item.label}: ${item.value}` : null}
          </div>
        ))}
        <div className='mt-3 mb-4'>
          <div className='action-buttons'>Deseja confirmar o envio dos dados acima?</div>
        </div>
        <div className='mt-2'>
          <div className='action-buttons'>
            {back}
            <button type='submit' className='btn btn-primary saveadd-primary-color m-1' disabled={loading}>
              {loading ? <FontAwesomeIcon spin icon={faSpinner} /> : 'Confirmar dados'}
            </button>
          </div>
        </div>
      </form>
    )
  }
}

export default ReviewInfo
