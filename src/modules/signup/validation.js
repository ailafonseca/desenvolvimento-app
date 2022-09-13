import { validateCpf, validateCnpj } from 'util/utils';
import moment from 'moment';

const validation = (name, value, classList) => {
  let defaultClassName = classList;
  let message = '';

  switch (name) {
    case 'confirmarSenha':
      const inputSenha = document.getElementById('signupSenha');
      if (value !== '' && value !== inputSenha.value) {
        defaultClassName.add('invalid');
        return message = 'Os campos Senha e Confirmar senha não coincidem'
      }
      if (value === '') {
        defaultClassName.add('invalid');
        return message = 'O campo Confirmar senha deve ser preenchido'
      }
      defaultClassName.remove('invalid')
      return message;

    case 'senha':
      if (value.length < 4 || value.length > 50) {
        defaultClassName.add('invalid');
        return message = 'A sua senha deve conter entre 4 e 50 caracteres';
      }
      defaultClassName.remove('invalid')
      return message;

    case 'cpf':
      const cleanCpf = value.replace(/[.-]/g, '')
      if (value.length === 0) {
        defaultClassName.add('invalid');
        return message = 'O campo CPF deve ser preenchido!';
      }
      if (cleanCpf.length === 11 && !validateCpf(cleanCpf)) {
        defaultClassName.add('invalid');
        return message = 'CPF inválido, tente novamente!';
      }
      defaultClassName.remove('invalid')
      return message

    case 'nome':
      const nome = value.trim();
      if (nome.length < 1) {
        defaultClassName.add('invalid');
        return message = 'Por favor, digite seu nome!';
      }
      defaultClassName.remove('invalid')
      return message;

    case 'nomeContrato':
      const nomeContrato = value.trim();
      if (nomeContrato.length < 1) {
        defaultClassName.add('invalid')
        return message = 'Por favor, dê um nome ao contrato';
      }
      defaultClassName.remove('invalid');
      return message;

    case 'descricaoContrato':
      const descricaoContrato = value.trim();
      if (descricaoContrato.length < 10) {
        defaultClassName.add('invalid')
        return message = 'Por favor, digite uma descrição do contrato';
      }
      defaultClassName.remove('invalid')
      return message;

    case 'email':
      if (value === '') {
        defaultClassName.add('invalid');
        return message = 'E-mail obrigatório!';
      }
      if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) === false) {
        defaultClassName.add('invalid');
        return message = 'E-mail inválido, tente novamente!';
      }
      defaultClassName.remove('invalid')
      return message

    case 'dataNascimento':
      const pastDate = moment().diff(moment(value), 'days')
      if (value.length === 0) {
        defaultClassName.add('invalid');
        return message = 'O campo Data de nascimento deve ser preenchido!';
      }

      if (pastDate < 1) {
        defaultClassName.add('invalid');
        return message = 'A data deve ser anterior a hoje!';
      }

      defaultClassName.remove('invalid');
      return message;

    case 'cnpj':
      const cleanCnpj = value.replace(/[.-/]/g, '');
      if (cleanCnpj.length === 0) {
        defaultClassName.add('invalid');
        return message = 'O campo CNPJ deve ser preenchido!';
      }
      if (cleanCnpj !== '' && !validateCnpj(cleanCnpj)) {
        defaultClassName.add('invalid');
        return message = 'CNPJ inválido, tente novamente!';
      }
      defaultClassName.remove('invalid');
      return message;

    case 'razaoSocial':
      if (value.length === 0) {
        defaultClassName.add('invalid');
        return message = 'O campo Razão Social deve ser preenchido!';
      }
      defaultClassName.remove('invalid');
      return message;

    case 'nomeEmpresa':
      if (value.length === 0) {
        defaultClassName.add('invalid');
        return message = 'O campo Nome Fantasia deve ser preenchido!';
      }
      defaultClassName.remove('invalid');
      return message;

    case 'setor':
      const setorInput = document.getElementById('signupSetorEmpresa');
      if (value.length === 0) {
        setorInput.classList.add('invalid');
        defaultClassName.add('invalid');
        return message = 'O campo Setor deve ser preenchido!';
      }
      setorInput.classList.remove('invalid');
      defaultClassName.remove('invalid');
      return message;

    case 'tipoEmpresa':
      const tipoEmpresaInput = document.getElementById('signupTipoEmpresa');
      if (value.length === 0) {
        tipoEmpresaInput.classList.add('invalid');
        return message = 'O campo Tipo Empresa deve ser preenchido!';
      }
      tipoEmpresaInput.classList.remove('invalid');
      return message;

    case 'cep':
      if (value.length === 0) {
        defaultClassName.add('invalid');
        return message = 'O campo CEP deve ser preenchido!';
      }
      defaultClassName.remove('invalid');
      return message;

    case 'logradouro':
      if (value.length === 0) {
        defaultClassName.add('invalid');
        return message = 'O campo Logradouro deve ser preenchido!';
      }
      defaultClassName.remove('invalid');
      return message;

    case 'numero':
      if (value.length === 0) {
        defaultClassName.add('invalid');
        return message = 'O campo Número deve ser preenchido!';
      }
      defaultClassName.remove('invalid');
      return message;

    case 'bairro':
      if (value.length === 0) {
        defaultClassName.add('invalid');
        return message = 'O campo Bairro deve ser preenchido!';
      }
      defaultClassName.remove('invalid');
      return message;

    case 'cidade':
      if (value.length === 0) {
        defaultClassName.add('invalid');
        return message = 'O campo Cidade deve ser preenchido!';
      }
      defaultClassName.remove('invalid');
      return message;

    case 'estado':
      if (value.length === 0) {
        defaultClassName.add('invalid');
        return message = 'O campo Estado deve ser preenchido!';
      }
      defaultClassName.remove('invalid');
      return message;

    case 'emailFiscal':
      if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) === false) {
        defaultClassName.add('invalid');
        return message = 'E-mail inválido, tente novamente!';
      }
      defaultClassName.remove('invalid');
      return message;

    case 'area':
      if (value.length !== 2) {
        defaultClassName.add('invalid');
        return message = 'O campo DDD deve ser preenchido!';
      }
      defaultClassName.remove('invalid');
      return message;

    case 'telefone':
      const cleanTel = value.replace(/[_-]/g, '')
      if (cleanTel.length < 8) {
        defaultClassName.add('invalid');
        return message = 'O campo Telefone deve ser preenchido!';
      }
      defaultClassName.remove('invalid');
      return message;

    default:
      return message;
  }
}

export default validation;
