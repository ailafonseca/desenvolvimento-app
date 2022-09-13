import React from "react";
import PropTypes from "prop-types";
import { createIntensoes } from "./actions";
import DesejoItemComponent, { itensDesejoEnum } from "./intencaoItemCompoment";
import ReviewInfo from "main/reviewInfo";

export const intencaoEnum = {
  comprar: "Comprar",
  vender: "Vender",
  fazerDoacao: "Fazer Doação",
  receberDoacao: "Receber Doação"
};

const intencaoConfig = [
  {
    id: 1,
    enum: intencaoEnum.comprar,
    title: "Deseja Comprar?",
    test: "toggleCompra",
    temExplicacao: false,
    exibirEmpresa: true,
    exibirOng: true
  },
  {
    id: 2,
    enum: intencaoEnum.vender,
    title: "Deseja Vender?",
    test: "toggleVenda",
    temExplicacao: false,
    exibirEmpresa: true,
    exibirOng: false
  },
  {
    id: 3,
    enum: intencaoEnum.fazerDoacao,
    title: "Deseja fazer doação?",
    test: "toggleDoar",
    temExplicacao: true,
    exibirEmpresa: true,
    exibirOng: false
  },
  {
    id: 4,
    enum: intencaoEnum.receberDoacao,
    title: "Deseja receber doação?",
    test: "toggleReceberDoacao",
    temExplicacao: true,
    exibirEmpresa: false,
    exibirOng: true
  }
];

class DesejoComponent extends React.Component {
  static propTypes = {
    onSuccess: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    isOng: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);

    let initialEmptyData = [];

    intencaoConfig.forEach((desejo) => {
      initialEmptyData.push({ id: desejo.id, checked: false, type: itensDesejoEnum.materiaPrima });
      initialEmptyData.push({ id: desejo.id, checked: false, type: itensDesejoEnum.ativos });
      initialEmptyData.push({ id: desejo.id, checked: false, type: itensDesejoEnum.alimentos });
      initialEmptyData.push({ id: desejo.id, checked: false, type: itensDesejoEnum.bensDeConsumo });
    });

    this.state = {
      loading: false,
      currentData: initialEmptyData,
      currentNewData: initialEmptyData,
      displayTrabalhoSocial: false,
      textTrabalhoSocial: "",
      qtySteps: {
        qty: 0,
        id: 0,
        title: "",
        value: false,
        boxIntencoes: []
      },
      currentStep: 0,
      sendData: [],
      reviewIntencoes: false,
      submitInfo: {}
    };
  }

  handleCheckBoxOnClickEvent = (e, id, enumText) => {
    const { currentNewData, currentStep } = this.state;
    const newItem = { id: id, checked: e.target.checked, type: enumText };
    let mergedNewData = currentStep > 0 ? [...currentNewData, newItem] : currentNewData;
    mergedNewData = mergedNewData.filter(
      (item) =>
        item.id !== id ||
        item.type !== enumText ||
        (item.id === id && item.type === enumText && item.checked === e.target.checked)
    );

    this.setState({ currentNewData: mergedNewData }, () => {
      if (intencaoConfig.filter((desejo) => desejo.id === id && desejo.temExplicacao)) {
        this.updateDisplayTrabalhoSocial();
      }
    });
  };

  updateDisplayTrabalhoSocial = () => {
    const { currentNewData } = this.state;
    const currentChecked = currentNewData.filter((item) => item.checked);
    const currentCheckedComExplicacao = intencaoConfig.filter(
      (config) => config.temExplicacao && currentChecked.filter((x) => x.id === config.id).length > 0
    );

    this.setState(
      {
        displayTrabalhoSocial: currentCheckedComExplicacao.length > 0
      },
      () => {
        if (!this.state.displayTrabalhoSocial) return this.setState({ textTrabalhoSocial: "" });
      }
    );
  };

  getItensDesejoView = (id) => {
    const { currentNewData } = this.state;

    return {
      materiaPrima:
        currentNewData
          .filter((item) => item.id === id && item.type === itensDesejoEnum.materiaPrima)
          .map((i) => i.checked)
          .join() === "true"
          ? true
          : false,
      ativos:
        currentNewData
          .filter((item) => item.id === id && item.type === itensDesejoEnum.ativos)
          .map((i) => i.checked)
          .join() === "true"
          ? true
          : false,
      alimentos:
        currentNewData
          .filter((item) => item.id === id && item.type === itensDesejoEnum.alimentos)
          .map((i) => i.checked)
          .join() === "true"
          ? true
          : false,
      bensDeConsumo:
        currentNewData
          .filter((item) => item.id === id && item.type === itensDesejoEnum.bensDeConsumo)
          .map((i) => i.checked)
          .join() === "true"
          ? true
          : false
    };
  };

  getServerJson = () => {
    const idComprar = intencaoConfig.find((item) => item.enum === intencaoEnum.comprar).id;
    const idVender = intencaoConfig.find((item) => item.enum === intencaoEnum.vender).id;
    const idFazerDoacao = intencaoConfig.find((item) => item.enum === intencaoEnum.fazerDoacao).id;
    const idReceberDoacao = intencaoConfig.find((item) => item.enum === intencaoEnum.receberDoacao).id;

    return {
      comprar: this.getItensDesejoView(idComprar),
      vender: this.getItensDesejoView(idVender),
      doar: this.getItensDesejoView(idFazerDoacao),
      receberDoacao: this.getItensDesejoView(idReceberDoacao),
      trabalhoSocial: this.state.textTrabalhoSocial
    };
  };

  submit = (e) => {
    let { currentStep, qtySteps, currentNewData } = this.state;
    let boxes = [...qtySteps.boxIntencoes];
    let qty = qtySteps.qty;

    e.preventDefault();
    this.setState({ loading: true });

    Object.values(e.target).map((item) => {
      if (item.type === "checkbox" && item.value === "true") {
        if (currentStep === 0) {
          qty += 1;
          boxes.push({
            qty,
            id: parseInt(item.id),
            title: item.title,
            value: item.value,
            box: this.getServerJson()
          });
          return this.setState({
            qtySteps: {
              qty,
              boxIntencoes: boxes
            }
          });
        }
      }
      return null;
    });

    if (currentStep >= qty) {
      const submitInfo = {
        comprar: {
          label: 'Comprar', value: currentNewData.map(x => {
            if (x.checked === true && x.id === 1) {
              return x.type;
            }
            return null
          })
            .filter(i => i !== null)
            .join(', ')
        },
        vender: {
          label: 'Vender', value: currentNewData.map(x => {
            if (x.checked === true && x.id === 2) {
              return x.type;
            }
            return null
          })
            .filter(i => i !== null)
            .join(', ')
        },
        fazerDoacao: {
          label: 'Fazer doação', value: currentNewData.map(x => {
            if (x.checked === true && x.id === 3) {
              return x.type;
            }
            return null
          })
            .filter(i => i !== null)
            .join(', ')
        },
        receberDoacao: {
          label: 'Receber doação', value: currentNewData.map(x => {
            if (x.checked === true && x.id === 4) {
              return x.type;
            }
            return null
          })
            .filter(i => i !== null)
            .join(', ')
        }
      }
      this.setState({ sendData: this.getServerJson(), reviewIntencoes: true, submitInfo });
    }

    if (currentStep < qty) {
      this.setState({
        sendData: this.getServerJson(),
        currentStep: currentStep + 1
      });
    }
  };

  exibirEmpresa = () => {
    const intencoesReadyList = intencaoConfig
      .filter((x) => x.exibirEmpresa)
      .sort((a, b) => {
        if (a.title > b.title) {
          return 1;
        }
        if (a.title < b.title) {
          return -1;
        }
        return 0;
      });

    return (
      <React.Fragment>
        {intencoesReadyList.map((item, i) => (
          <React.Fragment key={`DesejoItemComponent${item.id}`}>
            <DesejoItemComponent
              id={item.id}
              key={`DesejoItemComponent${item.id}`}
              title={item.title}
              test={item.test}
              onChange={this.handleCheckBoxOnClickEvent}
            />
          </React.Fragment>
        ))}
      </React.Fragment>
    );
  };

  exibirOng = () => {
    return (
      <React.Fragment>
        {intencaoConfig
          .filter((x) => x.exibirOng)
          .map((item, i) => (
            <React.Fragment key={`DesejoItemComponent${item.id}`}>
              <DesejoItemComponent
                id={item.id}
                key={`DesejoItemComponent${item.id}`}
                title={item.title}
                test={item.test}
                onChange={this.handleCheckBoxOnClickEvent}
              />
            </React.Fragment>
          ))}
      </React.Fragment>
    );
  };

  exibirTextArea = () => {
    return (
      <React.Fragment>
        <div className="row row-trabalho-social">
          <div className="col-sm-12">
            <div className="form-group">
              <label className="d-block" htmlFor="signupIntencaoUsoTrabalhoSocial">
                Qual trabalho social deseja que seja feito com suas doações?
              </label>
              <textarea
                className="w-100 d-block"
                name="signupIntencaoUsoTrabalhoSocial"
                id="signupIntencaoUsoTrabalhoSocial"
                cols="30"
                rows="5"
                value={this.state.textTrabalhoSocial}
                onChange={(e) => this.setState({ textTrabalhoSocial: e.target.value })}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  };

  renderBotoes = () => {
    const { qtySteps, currentStep } = this.state;
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-sm-12 d-flex justify-content-end">
            <div className="form-group">
              {this.props.cancelButton}
              {/* <button
                            className="btn btn-danger btn-back-login"
                            onClick={() => this.handleBack()}>
                            Voltar
                        </button> */}
              <button
                // disabled={this.state.loading}
                type="submit"
                className="btn btn-primary saveadd-primary-color btn-save-signup">
                {qtySteps && currentStep <= qtySteps.qty ? 'Próximo' : 'Concluir'}
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  displayCurrentItem = () => {
    const { currentData, qtySteps, currentStep } = this.state;
    const intencoesReadyList =
      qtySteps.boxIntencoes &&
      qtySteps.boxIntencoes.map((i) =>
        currentData
          .filter((x) => x.id === i.id)
          .sort((a, b) => {
            if (a.type > b.type) {
              return 1;
            }
            if (a.type < b.type) {
              return -1;
            }
            return 0;
          })
      );

    if (qtySteps.qty > 0 && intencoesReadyList.length >= currentStep) {
      const item = intencoesReadyList[currentStep - 1];
      const id = item.map(i => i.id).splice(0, 1)[0]

      return (
        <>
          <h6 className="intencaoTitle mb-3">{intencaoConfig.map((intencao, index) => intencao.id === id ? `${index + 1}. ${intencao.title}` : '')}</h6>
          {item.map((subitem, i) => (
            <DesejoItemComponent
              id={subitem.id}
              key={`DesejosSubitemComponent${subitem.id}-${i}-${currentStep}`}
              title={subitem.type}
              test={subitem.test}
              checked={subitem.checked}
              onChange={this.handleCheckBoxOnClickEvent}
            />
          ))}
        </>
      );
    }
    return null;
  };

  render() {
    const { isOng, onSuccess, token, dispatch } = this.props;
    const { qtySteps, displayTrabalhoSocial, reviewIntencoes, sendData, submitInfo } = this.state;

    if (reviewIntencoes) {
      return (
        <ReviewInfo
          data={submitInfo}
          dispatch={dispatch}
          send={sendData}
          token={token}
          onSuccess={onSuccess}
          action={createIntensoes}
          back={null}
        />
      );
    }

    return (
      <React.Fragment>
        <form ref={this.form} onSubmit={(e) => this.submit(e)}>
          <h5 className="card-title row">Intenções de Uso</h5>
          <h6 className="row">{isOng ? 'ONGs' : 'Empresas'}</h6>
          {this.displayCurrentItem()}
          {qtySteps.qty === 0 && <div className="row">{isOng ? this.exibirOng() : this.exibirEmpresa()}</div>}
          {displayTrabalhoSocial && this.exibirTextArea()}
          {this.renderBotoes()}
        </form>
      </React.Fragment>
    );
  }
}

export default DesejoComponent;
