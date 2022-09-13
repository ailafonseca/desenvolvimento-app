import React from 'react'
import { push } from 'connected-react-router'
import PropTypes from 'prop-types'
import { createCompany, getCnpjDetails, getAddress } from './actions'
import validation from './validation'
import Input from 'components/input'
import ReviewInfo from 'main/reviewInfo'
import Loading from 'components/loading'
import { SetorEmpresaList, TipoEmpresaList } from './constants'

class EmpresaComponent extends React.Component {
  static propTypes = {
    onSuccess: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired
  };

  constructor (props) {
    super(props)

    this.state = {
      naoTenhoCpf: false,
      companyData: {},
      submitInfo: {},
      cnpjSuccess: false,
      loading: false,
      empresa: {
        cnpj: '',
        nomeEmpresa: '',
        razaoSocial: '',
        inscricaoEstadual: '',
        tipoEmpresa: '',
        setor: '',
        emailFiscal: ''
      },
      telefone: {
        area: '',
        numero: '',
        ramal: ''
      },
      endereco: {
        cep: '',
        logradouro: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        estado: ''
      },
      canSubmit: false
    }
  }

  clearString = (str) => (str ? str.replace(/\D/g, '') : str);

  handleCnpjDetails = (value) => {
    const { dispatch } = this.props
    const clearValue = this.clearString(value)

    if (clearValue && clearValue.length === 14) {
      dispatch(
        getCnpjDetails(clearValue, (resp) => {
          this.setState(
            {
              empresa: {
                ...this.state.empresa,
                nomeEmpresa: resp.fantasia,
                razaoSocial: resp.nome,
                emailFiscal: resp.email,
                numero: resp.numero,
                inscricaoEstadual: resp.inscricao || ''
              },
              telefone: {
                ...this.state.telefone,
                numero: this.clearString(resp.telefone.split(' ')[1]),
                area: this.clearString(resp.telefone.split(' ')[0])
              },
              endereco: {
                ...this.state.endereco,
                cep: this.clearString(resp.cep),
                numero: resp.numero
              }
            },
            () => {
              dispatch(
                getAddress(this.clearString(resp.cep), (cepResp) => {
                  if (cepResp !== 'CEPNOTFOUND') {
                    this.setState({
                      endereco: {
                        ...this.state.endereco,
                        logradouro: cepResp.end || '',
                        bairro: cepResp.bairro || '',
                        cidade: cepResp.cidade || '',
                        estado: cepResp.uf || ''
                      }
                    })
                  }
                  return dispatch({ type: 'CLICK_OPEN' })
                })
              )
            }
          )
        })
      ).then(() => this.setState({ cnpjSuccess: true }))
    }
  };

  handleValidateCompany = (e) => {
    e.preventDefault()

    this.setState({ loading: true })

    let hasError = 0

    Object.values(e.target).map((input) => {
      if (input.name !== '' && input.name !== undefined) {
        if (validation(input.name, input.value, input.classList) === '') {
          hasError += 1
        }
        hasError -= 1
      }
      return hasError
    })
    if (hasError < 0) {
      return this.setState({ canSubmit: false, loading: false }, () => this.handleCreateEmpresa(e))
    }
    return this.setState({ canSubmit: true, loading: false }, () => this.handleCreateEmpresa(e))
  };

  handleCreateEmpresa = () => {
    const { canSubmit } = this.state

    const empresa = {
      ...this.state.empresa,
      telefones: [
        {
          ...this.state.telefone
        }
      ],
      enderecos: [
        {
          ...this.state.endereco
        }
      ]
    }

    const setorText = SetorEmpresaList.map((item) =>
      item.id === parseInt(this.state.empresa.setor) ? item.text : null
    )
      .filter((i) => i !== null)
      .toString()
    const tipoEmpresaText = TipoEmpresaList.map((item) =>
      item.id === parseInt(this.state.empresa.tipoEmpresa) ? item.text : null
    )
      .filter((i) => i !== null)
      .toString()

    const submitInfo = {
      cnpj: { label: 'CNPJ', value: this.state.empresa.cnpj },
      nomeFantasia: { label: 'Nome Fantasia', value: this.state.empresa.nomeEmpresa },
      razaoSocial: { label: 'Razão Social', value: this.state.empresa.razaoSocial },
      inscricaoEstadual: { label: 'Inscrição Estadual', value: this.state.empresa.inscricaoEstadual || '-' },
      tipoEmpresa: { label: 'Tipo de Empresa', value: tipoEmpresaText },
      setorEmpresa: { label: 'Setor', value: setorText },
      cep: { label: 'CEP', value: this.state.endereco.cep },
      logradouro: { label: 'Logradouro', value: this.state.endereco.logradouro },
      numero: { label: 'Número', value: this.state.endereco.numero },
      complemento: { label: 'Complemento', value: this.state.endereco.complemento },
      bairro: { label: 'Bairro', value: this.state.endereco.bairro },
      cidade: { label: 'Cidade', value: this.state.endereco.cidade },
      estado: { label: 'Estado', value: this.state.endereco.estado },
      emailNfe: { label: 'E-mail para NFE', value: this.state.empresa.emailFiscal },
      telefone: {
        label: 'Telefone para contato',
        value: `(${this.state.telefone.area}) ${
          this.state.telefone.numero && this.state.telefone.numero.indexOf('_') > -1
            ? this.state.telefone.numero.replace('_', '')
            : this.state.telefone.numero
        }`
      },
      ramal: { label: 'Ramal', value: this.state.telefone.ramal }
    }

    this.setState({ loading: true })
    if (canSubmit) {
      this.setState({ companyData: empresa, submitInfo })
    }
  };

  handleChangeInputEmpresa = (e, next) => {
    const { name, value } = e.target

    this.setState(
      {
        empresa: {
          ...this.state.empresa,
          [name]: value
        }
      },
      () => {
        if (next) {
          next(value)
        }
      }
    )
  };

  handleGetAddress = () => {
    const { dispatch } = this.props
    const { endereco } = this.state

    dispatch(
      getAddress(this.clearString(endereco.cep), (cepResp) => {
        if (cepResp !== 'CEPNOTFOUND') {
          this.setState({
            endereco: {
              ...this.state.endereco,
              logradouro: cepResp.end || '',
              bairro: cepResp.bairro || '',
              cidade: cepResp.cidade || '',
              estado: cepResp.uf || ''
            }
          })
        }
        return dispatch({ type: 'CLICK_OPEN' })
      })
    )
  };

  handleChangeInputTelefone = (e, next) => {
    let { name, value } = e.target

    if (name === 'telefone') {
      name = 'numero'
    }

    this.setState(
      {
        telefone: {
          ...this.state.telefone,
          [name]: value.replace('_', '')
        }
      },
      () => {
        if (next) {
          next(value)
        }
      }
    )
  };

  handleChangeInputEndereco = (e, next) => {
    const { name, value } = e.target

    this.setState(
      {
        endereco: {
          ...this.state.endereco,
          [name]: value
        }
      },
      () => {
        if (next) {
          next(value)
        }
      }
    )
  };

  renderDisplayCnpj = () => (
    <Input
      type='tel'
      mask='11.111.111/1111-11'
      name='cnpj'
      onChange={(e) => this.handleChangeInputEmpresa(e, this.handleCnpjDetails)}
      onBlur={validation}
      className='form-control d-block d-md-inline-block'
      value={this.state.empresa.cnpj}
      autoComplete='off'
      label='CNPJ'
      errorClass='invalid'
    />
  );

  renderDisplayNomeFantasia = () => (
    <Input
      type='text'
      name='nomeEmpresa'
      onChange={(e) => this.handleChangeInputEmpresa(e)}
      onBlur={validation}
      value={this.state.empresa.nomeEmpresa}
      autoComplete='off'
      label='Nome Fantasia'
      errorClass='invalid'
    />
  );

  renderDisplayRazaoSocial = () => (
    <Input
      type='text'
      name='razaoSocial'
      id='signupRazaoSocial'
      onChange={(e) => this.handleChangeInputEmpresa(e)}
      onBlur={validation}
      value={this.state.empresa.razaoSocial}
      autoComplete='off'
      label='Razão social'
      errorClass='invalid'
    />
  );

  renderDisplayInscricaoEstadual = () => (
    <Input
      type='text'
      name='inscricaoEstadual'
      id='signupInscricaoEstadual'
      onChange={(e) => this.handleChangeInputEmpresa(e)}
      onBlur={validation}
      value={this.state.empresa.inscricaoEstadual}
      autoComplete='off'
      label='Inscrição Estadual'
      errorClass='invalid'
    />
  );

  renderDisplayTipoEmpresa = () => {
    const options = TipoEmpresaList.map(item => ({
      value: item.id,
      label: item.text
    }))
    return (
      <Input
        isSearchable
        name='tipoEmpresa'
        id='signupTipoEmpresa'
        type='select'
        label='Tipo Empresa'
        errorClass='invalid'
        placeholder='Tipo Empresa'
        value={
          TipoEmpresaList.map((item) => (item.id === parseInt(this.state.empresa.tipoEmpresa) ? { value: item.id, label: item.text } : null))
            .filter((i) => i !== null)[0] || this.state.empresa.tipoEmpresa
        }
        onChange={option => {
          let val = ''
          if (option) {
            val = option.value
          }
          this.handleChangeInputEmpresa.call(this,
            {
              target: {
                name: 'tipoEmpresa',
                value: val
              }
            })
        }}
        onBlur={validation}
        options={options}
      />
    )
  }

  renderDisplaySetor = () => {
    const options = SetorEmpresaList.map(item => ({
      value: item.id,
      label: item.text
    }))
    return (
      <Input
        isSearchable
        label='Setor'
        type='select'
        name='setor'
        placeholder='Setor'
        value={SetorEmpresaList.map((item) => (item.id === parseInt(this.state.empresa.setor) ? { value: item.id, label: item.text } : null))
          .filter((i) => i !== null)[0] || this.state.empresa.setor}
        id='signupSetorEmpresa'
        onChange={option => {
          let val = ''
          if (option) {
            val = option.value
          }
          this.handleChangeInputEmpresa.call(this, {
            target: {
              name: 'setor',
              value: val
            }
          })
        }}
        errorClass='invalid'
        onBlur={validation}
        options={options}
      />
    )
  }

  renderDisplayCep = () => (
    <Input
      type='tel'
      mask='11.111-111'
      name='cep'
      id='signupCep'
      onChange={(e) => this.handleChangeInputEndereco(e)}
      value={this.state.endereco.cep}
      autoComplete='off'
      onBlur={() => this.handleGetAddress()}
      errorClass='invalid'
      label='CEP'
    />
  );

  renderDisplayLogradouro = () => (
    <Input
      type='text'
      name='logradouro'
      id='signupLogradouro'
      onChange={(e) => this.handleChangeInputEndereco(e)}
      onBlur={validation}
      value={this.state.endereco.logradouro}
      autoComplete='off'
      label='Logradouro'
      errorClass='invalid'
    />
  );

  renderDisplayNumero = () => (
    <Input
      type='text'
      name='numero'
      id='signupNumero'
      onChange={(e) => this.handleChangeInputEndereco(e)}
      onBlur={validation}
      value={this.state.endereco.numero}
      autoComplete='off'
      label='Numero'
      errorClass='invalid'
    />
  );

  renderDisplayComplemento = () => (
    <Input
      type='text'
      name='complemento'
      id='signupComplemento'
      onChange={(e) => this.handleChangeInputEndereco(e)}
      onBlur={validation}
      value={this.state.endereco.complemento}
      autoComplete='off'
      label='Complemento'
      errorClass='invalid'
    />
  );

  renderDisplayBairro = () => (
    <Input
      type='text'
      name='bairro'
      id='signupBairro'
      onChange={(e) => this.handleChangeInputEndereco(e)}
      onBlur={validation}
      value={this.state.endereco.bairro}
      autoComplete='off'
      label='Bairro'
      errorClass='invalid'
    />
  );

  renderDisplayCidade = () => (
    <Input
      type='text'
      name='cidade'
      id='signupCidade'
      onChange={(e) => this.handleChangeInputEndereco(e)}
      onBlur={validation}
      value={this.state.endereco.cidade}
      autoComplete='off'
      label='Cidade'
      errorClass='invalid'
    />
  );

  renderDisplayEstado = () => (
    <Input
      type='text'
      name='estado'
      id='signupEstado'
      onChange={(e) => this.handleChangeInputEndereco(e)}
      onBlur={validation}
      value={this.state.endereco.estado}
      autoComplete='off'
      label='Estado'
      errorClass='invalid'
    />
  );

  renderDisplayArea = () => (
    <Input
      type='text'
      name='area'
      id='signupArea'
      maxLength='2'
      onChange={(e) => this.handleChangeInputTelefone(e)}
      onBlur={validation}
      value={this.state.telefone.area}
      autoComplete='off'
      label='DDD'
      errorClass='invalid'
    />
  );

  renderDisplayTelefone = () => (
    <Input
      mask={(this.clearString(this.state.telefone.numero) || '').length <= 8 ? '1111-11111' : '11111-1111'}
      maxLength={10}
      name='telefone'
      id='signupTelefone'
      onChange={(e) => this.handleChangeInputTelefone(e)}
      onBlur={validation}
      value={this.clearString(this.state.telefone.numero)}
      autoComplete='off'
      label='Telefone'
      errorClass='invalid'
    />
  );

  renderDisplayRamal = () => (
    <Input
      type='text'
      name='ramal'
      id='signupRamal'
      onChange={(e) => this.handleChangeInputTelefone(e)}
      onBlur={validation}
      value={this.state.telefone.ramal}
      autoComplete='off'
      label='Ramal'
      errorClass='invalid'
    />
  );

  renderDisplayEmail = () => (
    <Input
      type='text'
      name='emailFiscal'
      id='cadastroEmailFiscal'
      onChange={(e) => this.handleChangeInputEmpresa(e)}
      onBlur={validation}
      value={this.state.empresa.emailFiscal}
      autoComplete='off'
      label='E-mail para NFE'
      errorClass='invalid'
    />
  );

  renderContato = () => (
    <>
      <h5 className='card-title'>Dados para Contato</h5>
      <div className='row'>
        <div className='col-4 col-md-1'>{this.renderDisplayArea()}</div>
        <div className='col-8 col-md-5'>{this.renderDisplayTelefone()}</div>
        <div className='col-12 col-md-6'>{this.renderDisplayRamal()}</div>
      </div>
      <div className='row'>
        <div className='col-sm-12'>{this.renderDisplayEmail()}</div>
      </div>
    </>
  );

  renderAllForm = () => (
    <form ref={this.form} onSubmit={(e) => this.handleValidateCompany(e)}>
      <h5 className='card-title'>Dados da Empresa</h5>
      <div className='row align-items-end'>
        <div className='col-sm-12'>{this.renderDisplayCnpj()}</div>
      </div>
      {this.state.cnpjSuccess && this.renderSegundaParteFormulario()}
      {!this.state.cnpjSuccess && this.renderBotaoNaotenhoCnpj()}
      {!this.state.cnpjSuccess && this.state.naoTenhoCpf && this.renderExplicacaoSemCnpj()}
    </form>
  );

  renderBotaoNaotenhoCnpj = () => (
    <div className='row'>
      <div className='col-sm-12 d-flex justify-content-end'>
        <div className='form-group'>
          {this.props.cancelButton}
          <button
            className='btn btn-danger'
            onClick={() =>
              this.setState({
                naoTenhoCpf: true
              })}
          >
            Não Possuo CNPJ
          </button>
        </div>
      </div>
    </div>
  );

  renderExplicacaoSemCnpj = () => (
    <>
      <div>
        Atualmente é necessário um CNPJ para se cadastrar em nosso sistema. Se desejar mais informações, entre em
        contato com suporte@saveadd.com.br
      </div>
      <div className='row'>
        <div className='col-sm-12 d-flex justify-content-end'>
          <div className='form-group'>
            <button className='btn btn-danger' onClick={() => this.props.dispatch(push('/'))}>
              Sair
            </button>
          </div>
        </div>
      </div>
    </>
  );

  renderSegundaParteFormulario = () => (
    <>
      <div className='row'>
        <div className='col-md-6'>{this.renderDisplayNomeFantasia()}</div>
        <div className='col-md-6'>{this.renderDisplayRazaoSocial()}</div>
      </div>
      <div className='row'>
        <div className='col-md-4'>{this.renderDisplayInscricaoEstadual()}</div>
        <div className='col-md-3'>{this.renderDisplayTipoEmpresa()}</div>
        <div className='col-md-5'>{this.renderDisplaySetor()}</div>
      </div>
      <div className='row'>
        <div className='col-md-3'>{this.renderDisplayCep()}</div>
        <div className='col-md-6'>{this.renderDisplayLogradouro()}</div>
        <div className='col-md-3'>{this.renderDisplayNumero()}</div>
      </div>
      <div className='row'>
        <div className='col-md-4'>{this.renderDisplayComplemento()}</div>
        <div className='col-md-3'>{this.renderDisplayBairro()}</div>
        <div className='col-md-3'>{this.renderDisplayCidade()}</div>
        <div className='col-md-2'>{this.renderDisplayEstado()}</div>
      </div>
      {this.renderContato()}
      {this.renderBotoes()}
    </>
  );

  renderBotoes = () => (
    <>
      <div className='row'>
        <div className='col-sm-12 d-flex justify-content-end'>
          <div className='form-group'>
            {this.props.cancelButton}
            {/* <button
                            className="btn btn-danger btn-back-login"
                            onClick={() => this.handleBack()}>
                            Voltar
                        </button> */}
            <button type='submit' className='btn btn-primary saveadd-primary-color btn-save-signup'>
              Próximo
            </button>
          </div>
        </div>
      </div>
    </>
  );

  render () {
    const { dispatch, onSuccess, token, cadastro } = this.props
    const { canSubmit, submitInfo, companyData } = this.state

    if (cadastro.isLoading) {
      return <Loading />
    }

    if (canSubmit) {
      return (
        <ReviewInfo
          data={submitInfo}
          dispatch={dispatch}
          send={companyData}
          token={token}
          onSuccess={onSuccess}
          action={createCompany}
          back={
            <button className='btn btn-danger' type='button' onClick={() => this.setState({ canSubmit: false })}>
              Voltar e editar dados
            </button>
          }
        />
      )
    }

    return this.renderAllForm()
  }
}

export default EmpresaComponent
