import React from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faList } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "react-bootstrap";

import { DisplayData, DisplayString } from "util/display";
import InputNumber from "../../../components/input/inputNumberConfirm";

import { loadDetalhes, saveReservaDono } from "../entrega/action";
import ObservationTextArea from "../../../components/observationTextArea";
import Loading from "../../../components/loading";

import BotaoSalvar from "components/BotaoSalvar";

class anuncioVitrineReserva extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      produtos: undefined,
      anuncio: undefined,
      vendaRecorrente: undefined,
      idVendaRecorrenteReserva: undefined,
      idVendaRecorrenteAnuncio: undefined,
      loaded: false,
      showInput: false,
      newQuantidadeRetiradaVendedor: "",
      observacaoRevisao: "",
    };
  }

  componentDidMount() {
    const {
      match: { params },
      dispatch,
      loadDetalhes,
    } = this.props;
    const idVendaoRecorrenteAnuncio = params.idVendaRecorrenteAnuncio;

    dispatch(loadDetalhes(idVendaRecorrenteAnuncio));
  }

  componentDidUpdate() {
    const entity = this.props.vendaReserva;

    if (this.state.loaded === false && entity !== undefined) {
      const produtos = entity.produtos.map((produto) => {
        let anuncioProduto = entity.anuncio.produtos.find((x) => x.idProduto === produto.idProduto);

        if (anuncioProduto !== undefined)
          return {
            quantidadeReservada: 0,
            ...produto,
            quantidade: anuncioProduto.quantidade,
            unidade: anuncioProduto.unidade,
          };

        return {
          quantidadeReservada: 0,
          ...produto,
          quantidade: 0,
          unidade: "",
        };
      });

      const obj = {
        ...this.state,
        loaded: true,
        anuncio: entity.anuncio,
        vendaRecorrente: entity.anuncio.vendaRecorrente,
        produtos,
        idVendaRecorrenteReserva: entity.idVendaRecorrenteReserva,
        idVendaRecorrenteAnuncio: entity.idVendaRecorrenteAnuncio,
        observacaoRevisao: entity.observacaoRevisao || "",
      };

      this.setState(obj);
    }
  }

  displayHorario = (inicio, fim) => {
    if (inicio !== undefined && inicio !== null && fim !== undefined && fim !== null) return `${inicio.substring(0, 5)}-${fim.substring(0, 5)}`;
    return "-";
  };

  renderList(item) {
    let nome = "";

    if (item.vendaRecorrente !== undefined && item.vendaRecorrente !== null) nome = DisplayString(item.vendaRecorrente.nome);

    return (
      <div className="table-responsive">
        <table className="table table-striped table-hover table-sm mb-3">
          <thead>
            <tr>
              <th scope="col">Venda Recorrente</th>
              <th scope="col">Data</th>
              <th scope="col" className="d-none d-lg-table-cell">
                Reserva
              </th>
              <th scope="col" className="d-none d-lg-table-cell">
                Entrega
              </th>
            </tr>
          </thead>
          <tbody>
            <tr key={item.idVendaRecorrenteAnuncio}>
              <td>{nome}</td>
              <td>{DisplayData(item.data)}</td>
              <td className="d-none d-lg-table-cell">{this.displayHorario(item.inicioReserva, item.fimReserva)}</td>
              <td className="d-none d-lg-table-cell">{this.displayHorario(item.inicioEntrega, item.fimEntrega)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  onChangeQuantidade = (value, idProduto) => {
    //this.setState({ newQuantidadeRetiradaVendedor: e.target.value }, () => {
    const index = this.state.produtos.findIndex((produto) => produto.idProduto === idProduto);
    let produtos = this.state.produtos;
    const floatRetiradaVendedor = parseFloat(value);
    produtos[index].quantidadeRetiradaVendedor = floatRetiradaVendedor;
    produtos[index].showInput = false;
    this.setState({ produtos });
    //})
  };

  onCancelQuantidade = (idProduto) => {
    const index = this.state.produtos.findIndex((produto) => produto.idProduto === idProduto);
    const produtos = this.state.produtos;
    produtos[index].showInput = undefined;
    this.setState({ produtos });
  };

  onSubmit() {
    const { dispatch, saveReservaDono } = this.props;
    const item = {
      idVendaRecorrenteReserva: this.state.idVendaRecorrenteReserva,
      idVendaRecorrenteAnuncio: this.state.idVendaRecorrenteAnuncio,
      idVendaRecorrente: this.state.vendaRecorrente.idVendaRecorrente,
      produtos: this.state.produtos,
      observacaoRevisao: this.state.observacaoRevisao,
    };

    dispatch(saveReservaDono(item));
  }

  confirmQtde = (item, idProduto) => {
    const index = this.state.produtos.findIndex((produto) => produto.idProduto === idProduto);
    const produtos = this.state.produtos;
    produtos[index].quantidadeRetiradaVendedor = item.quantidadeRetiradaComprador;
    produtos[index].showInput = false;
    this.setState({ produtos });
  };

  handleEditQtde = (idProduto) => {
    const index = this.state.produtos.findIndex((produto) => produto.idProduto === idProduto);
    const produtos = this.state.produtos;
    produtos[index].showInput = true;
    this.setState({ produtos });
  };

  renderButtonOk = (item, produto) =>
    !item.quantidadeRetiradaVendedor ? <Dropdown.Item onClick={() => this.confirmQtde(item, produto.idProduto)}>Confirmar</Dropdown.Item> : null;
  renderButtonFix = (item) => <Dropdown.Item onClick={() => this.handleEditQtde(item.idProduto)}>Corrigir</Dropdown.Item>;

  renderMenuItem = (item, produto) => {
    if (item.showInput === undefined) {
      return (
        <React.Fragment>
          <Dropdown size="sm">
            <Dropdown.Toggle size="sm" variant="primary" id="dropdown-basic">
              <FontAwesomeIcon icon={faList} size="sm" />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {this.renderButtonOk(item, produto)}
              {this.renderButtonFix(item)}
            </Dropdown.Menu>
          </Dropdown>
        </React.Fragment>
      );
    } else if (item.showInput !== true) {
      return <FontAwesomeIcon icon={faCheck} size="sm" />;
    }
  };

  renderInputQtdRetirada = (item) => {
    if (item.showInput) {
      return (
        <InputNumber
          id={item.idProduto}
          valor={item.quantidadeRetiradaVendedor}
          precision={0}
          confirmacao={true}
          onSave={this.onChangeQuantidade}
          onCancel={this.onCancelQuantidade}
        />
      );
    }
    return null;
  };

  renderLinhaProduto(item) {
    const produto = item.produto;

    return (
      <tr key={item.idProduto}>
        <td>{produto.nomeProduto}</td>
        <td>{item.unidade}</td>
        <td>{item.quantidade}</td>
        <td>{item.quantidadeReservada}</td>
        <td>
          {item.quantidadeRetiradaComprador !== item.quantidadeRetiradaVendedor && !isNaN(item.quantidadeRetiradaVendedor) && item.quantidadeRetiradaVendedor > 0 ? (
            <React.Fragment>
              <span style={{ textDecoration: "line-through" }}>{item.quantidadeRetiradaComprador}</span>
              <span>{` ${item.quantidadeRetiradaVendedor}`}</span>
            </React.Fragment>
          ) : (
            item.quantidadeRetiradaComprador
          )}
        </td>
        <td>
          {this.renderMenuItem(item, produto)}
          {this.renderInputQtdRetirada(item, produto)}
        </td>
      </tr>
    );
  }

  renderTabelaProduto(produtos) {
    return (
      <div className="table-responsive my-3">
        <table className="table table-striped table-hover table-sm">
          <thead>
            <tr>
              <th scope="col">produto</th>
              <th scope="col">Und</th>
              <th scope="col">Qtd Disp.</th>
              <th scope="col">Qtd Res.</th>
              <th scope="col">Qtd Retir.</th>
              <th scope="col">Qtd Retir</th>
            </tr>
          </thead>
          <tbody>{produtos.map((produto) => this.renderLinhaProduto(produto))}</tbody>
        </table>
      </div>
    );
  }

  onChangeTextArea = (value) => this.setState({ ...this.state, observacaoRevisao: value });

  render() {
    const { vendaReserva } = this.props;

    if (vendaReserva === undefined || this.state.produtos === undefined || this.state.produtos.constructor !== Array) return <Loading />;

    return (
      <React.Fragment>
        <div className="container">
          {this.renderList(this.state.anuncio)}
          <div className="lastObservations">
            {this.state.anuncio.observacaoAnuncio && <p>{`Observação do anúncio: ${this.state.anuncio.observacaoAnuncio}`}</p>}
            {vendaReserva.ObservacaoReserva && <p>{`Observação da reserva: ${vendaReserva.ObservacaoReserva}`}</p>}
            {vendaReserva.ObservacaoEntrega && <p>{`Observação da entrega: ${vendaReserva.ObservacaoEntrega}`}</p>}
          </div>
          {this.renderTabelaProduto(this.state.produtos)}
          <ObservationTextArea
            onChange={(e) => this.onChangeTextArea(e.target.value)}
            ref={this.textAreaRef}
            maxchars={500}
            labeltextarea="Observações:"
            textarearows="3"
            value={this.state.observacaoRevisao}
          />
          <div className={`row justify-content-end container-actions ${this.props.isInViewport ? "container-actions-absolute" : "container-actions-absolute"}`}>
            <div className="col-md-3 col-sm-2 my-2">
              <BotaoSalvar onClick={() => this.onSubmit()} />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.vendaVitrine.isLoading,
  vendaReserva: state.vendaVitrine.detalhes,
});
const mapDispatchToProps = (dispatch) => ({
  dispatch,
  loadDetalhes,
  saveReservaDono,
});
export default connect(mapStateToProps, mapDispatchToProps)(anuncioVitrineReserva);
