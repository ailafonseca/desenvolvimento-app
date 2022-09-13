import React from "react";
import PropTypes from "prop-types";
import Input from "components/input";
import "./signup.css";
import { createUser } from "./actions";
import validation from "./validation";
import ReviewInfo from "main/reviewInfo";

class UsuarioComponent extends React.Component {
  static propTypes = {
    onSuccess: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      nome: "",
      cpf: "",
      email: "",
      dataNascimento: "",
      senha: "",
      confirmarSenha: "",
      canSubmit: false,
      submitInfo: {},
      usuarioData: {}
    };
  }

  handleValidateUser = (e) => {
    e.preventDefault();

    this.setState({ loading: true });

    let hasError = 0;

    Object.values(e.target).map((input) => {
      if (input.name !== "" && input.name !== undefined) {
        if (validation(input.name, input.value, input.classList) === "") {
          hasError += 1;
        }
        hasError -= 1;
      }
      return hasError;
    });
    if (hasError < 0) {
      return this.setState({ canSubmit: false, loading: false }, () => this.handleCreateUser(e));
    }
    return this.setState({ canSubmit: true, loading: false }, () => this.handleCreateUser(e));
  };

  handleCreateUser = (e) => {
    const { nome, email, cpf, dataNascimento, senha, confirmarSenha, canSubmit } = this.state;

    const usuarioData = {
      nome,
      email,
      cpf,
      nascimento: dataNascimento
        .split("/")
        .reverse()
        .join("-"),
      senha,
      confirmacaoSenha: confirmarSenha
    };

    const submitInfo = {
      nome: { label: "Nome", value: nome },
      email: { label: "E-mail", value: email },
      cpf: { label: "CPF", value: cpf },
      nascimento: {
        label: "Data de nascimento",
        value: dataNascimento
          .split("-")
          .reverse()
          .join("/")
      }
    };

    if (canSubmit) {
      this.setState({ submitInfo, usuarioData });
      // dispatch(createUser(usuarioData, (resp) => onSuccess(resp.token), () => this.setState({ loading: false })));
    }
  };

  handleChangeInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  renderFieldNome = () => (
    <Input
      autoFocus
      type="text"
      name="nome"
      id="signupNome"
      value={this.state.nome}
      onChange={(e) => this.handleChangeInput(e)}
      //onBlur={validation}
      errorClass="invalid"
      label="Nome"
      autoComplete="off"
      maxLength={255}
      minLength={1}
      ref={(e) => e}
    />
  );

  renderFieldCpf = () => (
    <Input
      type="tel"
      mask="111.111.111-11"
      name="cpf"
      id="signupCpf"
      autoComplete="off"
      value={this.state.cpf}
      onChange={(e) => this.handleChangeInput(e)}
      // onBlur={validation}
      label="CPF"
      errorClass="invalid"
    />
  );

  renderFieldEmail = () => (
    <Input
      type="text"
      name="email"
      id="signupEmail"
      onChange={(e) => this.handleChangeInput(e)}
      // onBlur={validation}
      value={this.state.email}
      errorClass="invalid"
      label="E-mail"
      autoComplete="off"
    />
  );

  renderFieldNascimento = () => (
    <Input
      type="date"
      name="dataNascimento"
      id="signupDataNascimento"
      value={this.state.dataNascimento}
      onChange={(e) => this.handleChangeInput(e)}
      // onBlur={validation}
      errorClass="invalid"
      label="Data de nascimento"
      autoComplete="off"
    />
  );

  renderFieldSenha = () => (
    <Input
      type="password"
      name="senha"
      data-test="signupSenha"
      id="signupSenha"
      value={this.state.senha}
      onChange={(e) => this.handleChangeInput(e)}
      errorClass="invalid"
      autoComplete="off"
      // onBlur={validation}
      label="Senha"
    />
  );

  renderFieldSenhaConfirmar = () => (
    <Input
      type="password"
      name="confirmarSenha"
      data-test="signupConfirmarSenha"
      id="signupConfirmarSenha"
      value={this.state.confirmarSenha}
      onChange={(e) => this.handleChangeInput(e)}
      errorClass="invalid"
      autoComplete="off"
      label="Confirmar senha"
      // onBlur={validation}
    />
  );

  renderDadosUsuario = () => (
    <form className="form form-invalid" ref={this.form} onSubmit={(e) => this.handleValidateUser(e)}>
      <input
        type="text"
        style={{width: 0.1,  height: 0.1,  opacity: 0.01, margin: 0,zIndex: -99999}}></input>
      <h5 className="card-title">Dados da pessoa física</h5>
      <div className="row">
        <div className="col-md-8">{this.renderFieldNome()}</div>
        <div className="col-md-4">{this.renderFieldCpf()}</div>
      </div>
      <div className="row">
        <div className="col-md-8">{this.renderFieldEmail()}</div>
        <div className="col-md-4">{this.renderFieldNascimento()}</div>
      </div>
      <div className="row">
        <div className="col-md-6">{this.renderFieldSenha()}</div>
        <div className="col-md-6">{this.renderFieldSenhaConfirmar()}</div>
      </div>
      <div className="row mt-5">
        <div className="col-sm-12 d-flex justify-content-end">
          <div className="form-group">
            {this.props.cancelButton}
            <button type="button" className="btn btn-danger btn-back-login" onClick={() => this.props.onCancel()}>
              Voltar ao login
            </button>
            <button
              type="submit"
              disabled={this.state.loading}
              className="btn btn-primary saveadd-primary-color btn-save-signup">
              Próximo
            </button>
          </div>
        </div>
      </div>
    </form>
  );

  render() {
    const { dispatch, onSuccess } = this.props;
    const { canSubmit, submitInfo, usuarioData } = this.state;
    if (canSubmit) {
      return (
        <ReviewInfo
          data={submitInfo}
          dispatch={dispatch}
          send={usuarioData}
          onSuccess={onSuccess}
          action={createUser}
          back={
            <button className="btn btn-danger" type="button" onClick={() => this.setState({ canSubmit: false })}>
              Voltar e editar dados
            </button>
          }
        />
      );
    }
    return <div>{this.renderDadosUsuario()}</div>;
  }
}

export default UsuarioComponent;
