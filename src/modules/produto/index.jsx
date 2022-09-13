import React from 'react'
import { connect } from 'react-redux'
import Loading from 'components/loading'
import {
  loadCategorias,
  loadProdutoById,
  postProduto,
  addImagemDoProduto,
  postCategoria,
  deleteImagemDoProduto
} from './actions'
import ReviewInfo from 'main/reviewInfo'
import Input from 'components/input'
import imgPlaceholder from './placeholder-600x600.png'
import './product.css'

const initialState = {
  id: '',
  nome: '',
  imagem: '',
  descricao: '',
  preco: '',
  editBasic: true,
  editCategories: false,
  editImagem: false,
  editData: false,
  nomeCategoria: '',
  sendData: {},
  submitInfo: {},
  canSubmit: false,
  afterSubmit: () => false,
  isDisabled: true
}

class Product extends React.Component {
  constructor (props) {
    super(props)

    this.state = initialState

    this.inputImagem = React.createRef()
  }

  componentDidMount () {
    const {
      dispatch,
      match: { params }
    } = this.props
    const id = params.id

    this.setState({ id: params.id })
    dispatch(loadProdutoById(id)).then(() => dispatch(loadCategorias()))
  }

  componentDidUpdate (prevProps) {
    const { product, categories } = this.props
    if (prevProps.product !== product) {
      this.setState({
        nome: product.nomeProduto,
        descricao: product.descricaoProduto,
        preco: product.precoBase ? product.precoBase.toFixed(2) : ''
      })
    }

    if (prevProps.categories !== categories) {
      const initialCateg = categories.map((categ) => {
        return categ.idCategoria === product.categoria
          ? categ
          : categ.filhos.filter((i) => i.idCategoria === product.categoria)[0]
      })
      this.setState({
        nomeCategoria:
          initialCateg && initialCateg.filter((item) => item).length > 0
            ? initialCateg.filter((item) => item)[0].nomeCategoria
            : ''
      })
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  onImageChange = (event) => this.convertImagem(event.target.files[0]);

  convertImagem = (file) => {
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        this.setState({
          imagem: e.target.result
        })
      }
      return reader.readAsDataURL(file)
    }
  };

  saveImagem = () => {
    const { id } = this.state
    const { dispatch } = this.props

    return dispatch(addImagemDoProduto(id, this.inputImagem.files[0]))
  };

  saveData = () => {
    const { nome, descricao, preco, id } = this.state

    const numberPreco = parseFloat(preco).toFixed(2)

    const send = {
      nomeProduto: nome,
      descricaoProduto: descricao,
      precoBase: numberPreco > 0 ? numberPreco : 0,
      idProduto: id
    }

    const data = [
      {
        label: 'Nome',
        value: nome
      },
      {
        label: 'Descrição',
        value: descricao
      },
      {
        label: 'Preço',
        value: `R$${numberPreco > 0 ? numberPreco : 0}`
      }
    ]

    return this.setState({
      submitInfo: data,
      sendData: send,
      canSubmit: true,
      action: postProduto,
      onSuccess: () => false,
      afterSubmit: () => this.backBasic
    })
  };

  handleSubmit = (e) => {
    e.preventDefault()
    console.log('submetendo o form', e.target.elements)
  };

  sortCategories = (categories) => {
    const auxCategories = categories.sort((a, b) => {
      if (a.nomeCategoria > b.nomeCategoria) {
        return 1
      }
      if (a.nomeCategoria < b.nomeCategoria) {
        return -1
      }
      return 0
    })

    return auxCategories
  };

  setCategory = (e) => {
    const { categories } = this.props
    const filteredCateg = categories && categories.filter((cat) => cat.nomeCategoria === e.target.value)

    this.setState({ currentCateg: filteredCateg[0].idCategoria }, () => {
      return this.setState({ subCategories: filteredCateg[0].filhos })
    })
  };

  setSubCategory = (e) => {
    const { subCategories } = this.state
    const filteredCateg = subCategories && subCategories.filter((cat) => cat.nomeCategoria === e.target.value)

    this.setState({
      currentSubCateg: filteredCateg[0].idCategoria,
      nomeCategoria: filteredCateg[0].nomeCategoria,
      isDisabled: false
    })
  };

  renderCategories = () => {
    const { categories } = this.props
    const { subCategories, currentCateg, isDisabled } = this.state

    return (
      <div className='col-sm-12'>
        <select className='form-control my-2' onChange={(e) => this.setCategory(e)} idCategoria={currentCateg}>
          <option>Selecione uma categoria...</option>
          {categories &&
            this.sortCategories(categories).map((category) => (
              <option key={category.idCategoria} idCategoria={category.idCategoria}>
                {category.nomeCategoria}
              </option>
            ))}
        </select>
        <select className='form-control' onChange={(e) => this.setSubCategory(e)}>
          <option>Selecione uma subcategoria...</option>
          {subCategories &&
            subCategories.map((subCategory) => (
              <option key={subCategory.idCategoria} idCategoria={subCategory.idCategoria}>
                {subCategory.nomeCategoria}
              </option>
            ))}
        </select>
        <div className='mt-3 action-buttons'>
          <button className='btn btn-danger m-1' onClick={() => this.backBasic()}>
            Voltar
          </button>
          <button
            className='btn btn-primary saveadd-primary-color m-1'
            disabled={isDisabled}
            onClick={() => this.saveCategory()}
          >
            Salvar
          </button>
        </div>
      </div>
    )
  };

  saveCategory = () => {
    const { currentCateg, currentSubCateg, id, nomeCategoria } = this.state

    const submitInfo = [
      {
        label: 'Categoria',
        value: nomeCategoria
      }
    ]

    const sendData = {
      id,
      category: currentSubCateg || currentCateg
    }

    return this.setState({
      submitInfo,
      sendData,
      canSubmit: true,
      action: postCategoria,
      onSuccess: () => false,
      afterSubmit: () => this.backBasic
    })
  };

  deleteImagem = (id) => {
    const { dispatch } = this.props
    dispatch(deleteImagemDoProduto(id))
  };

  renderImagem = () => {
    const { imagem, nome } = this.state
    const { product } = this.props

    return (
      <>
        <div className='my-3 col-sm-12'>
          {product && product.imagens && product.imagens.length > 0 && product.imagens[0].idImagem ? (
            <img
              src={imagem || this.getImage(product.imagens[0].idImagem, product.imagens[0].contentType)}
              alt={nome}
              style={{ maxHeight: 160 }}
            />
          ) : (
            <img src={imgPlaceholder} alt={nome} style={{ height: 160 }} />
          )}
          <input
            placeholder='Imagem'
            type='file'
            className='my-3'
            name='imagem'
            onChange={this.onImageChange}
            ref={(e) => (this.inputImagem = e)}
          />
        </div>
        <div className='col-sm-12 action-buttons'>
          <button className='btn btn-danger m-1' onClick={() => this.backBasic()}>
            Voltar
          </button>
          <button
            className='btn btn-outline-danger m-1'
            onClick={() => this.deleteImagem(product && product.imagens && product.imagens[0].idImagem)}
          >
            Excluir imagem
          </button>
          <button className='btn btn-primary saveadd-primary-color m-1' onClick={() => this.saveImagem()}>
            Salvar
          </button>
        </div>
      </>
    )
  };

  renderData = () => {
    const { nome, descricao, preco } = this.state
    return (
      <form onSubmit={(e) => this.handleSubmit(e)} className='col-sm-12'>
        <div className='my-3'>
          <Input
            type='text'
            name='nome'
            value={nome}
            onChange={(e) => this.handleChange(e)}
            label='Nome'
            id='productNome'
          />
        </div>
        <div className='my-3'>
          <label htmlFor='productDesc'>Descrição</label>
          <textarea
            id='productDesc'
            className='form-control'
            rows={5}
            name='descricao'
            value={descricao}
            onChange={(e) => this.handleChange(e)}
          />
        </div>
        <div className='my-3'>
          <Input
            label='Preço'
            type='number'
            name='preco'
            value={preco}
            onChange={(e) => this.handleChange(e)}
            id='productPreco'
          />
        </div>
        <div className='action-buttons'>
          <button className='btn btn-danger m-1' onClick={() => this.backBasic()}>
            Voltar
          </button>
          <button className='btn btn-primary m-1 saveadd-primary-color' onClick={() => this.saveData()}>
            Salvar
          </button>
        </div>
      </form>
    )
  };

  backBasic = () =>
    this.setState({
      editBasic: true,
      editImagem: false,
      editCategories: false,
      editData: false
    });

  getImage = (fileName, extension) => {
    let imageUrl = `https://saveadd-files.s3-sa-east-1.amazonaws.com/${fileName}`
    switch (extension) {
      case 'image/png':
        return (imageUrl += '.png')
      case 'image/gif':
        return (imageUrl += '.gif')
      default:
        return (imageUrl += '.jpg')
    }
  };

  renderBasic = () => {
    const { nome, descricao, preco, nomeCategoria } = this.state
    const { product } = this.props

    return (
      <>
        <div className='col-sm-12'>
          {product && product.imagens && product.imagens.length > 0 && product.imagens[0].idImagem ? (
            <img
              src={this.getImage(product.imagens[0].idImagem, product.imagens[0].contentType)}
              alt={nome}
              style={{ maxHeight: 160 }}
            />
          ) : (
            <img src={imgPlaceholder} alt={nome} style={{ height: 160 }} />
          )}
        </div>
        <div className='col-sm-12'>{nome && <p>Nome: {nome}</p>}</div>
        <div className='col-sm-12'>{descricao && <p>Descrição: {descricao}</p>}</div>
        <div className='col-sm-12'>{nomeCategoria && <p>Categoria: {nomeCategoria}</p>}</div>
        <div className='col-sm-12'>
          <p>Preço: {preco ? `R$${preco}` : '-'}</p>
        </div>
      </>
    )
  };

  renderButtons = () => {
    return (
      <>
        <button
          className='btn btn-primary m-1'
          onClick={() =>
            this.setState({
              editCategories: true,
              editBasic: false,
              editData: false,
              editImagem: false
            })}
        >
          Editar categorias
        </button>
        <button
          className='btn btn-warning m-1'
          onClick={() =>
            this.setState({
              editImagem: true,
              editBasic: false,
              editCategories: false,
              editData: false
            })}
        >
          Editar imagem
        </button>
        <button
          className='btn btn-primary saveadd-primary-color m-1'
          onClick={() =>
            this.setState({
              editData: true,
              editBasic: false,
              editImagem: false,
              editCategories: false
            })}
        >
          Editar dados
        </button>
      </>
    )
  };

  render () {
    const {
      editImagem,
      editCategories,
      editData,
      editBasic,
      canSubmit,
      submitInfo,
      sendData,
      action,
      onSuccess,
      afterSubmit
    } = this.state

    const { dispatch, token, pageProduct } = this.props

    if (pageProduct.isLoading) {
      return <Loading />
    }

    if (canSubmit) {
      return (
        <div className='container mt-3'>
          <ReviewInfo
            data={submitInfo}
            dispatch={dispatch}
            send={sendData}
            token={token}
            onSuccess={onSuccess}
            afterSubmit={afterSubmit}
            action={action}
            back={
              <button className='btn btn-danger m-1' onClick={() => this.setState({ canSubmit: false })}>
                Cancelar
              </button>
            }
          />
        </div>
      )
    }

    return (
      <div className='container mt-3'>
        <div className='row'>
          {editBasic && this.renderBasic()}
          {editImagem && this.renderImagem()}
          {editCategories && this.renderCategories()}
          {editData && this.renderData()}
        </div>
        <div className='row my-3'>
          <div className='col-sm-12 action-buttons'>{editBasic && this.renderButtons()}</div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  categories: state.product.categories,
  pageProduct: state.product,
  product: state.produto.product
})
const mapDispatchToProps = (dispatch) => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(Product)
