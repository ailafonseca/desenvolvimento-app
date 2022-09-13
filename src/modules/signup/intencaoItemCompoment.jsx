import React from "react";
import PropTypes from "prop-types";
import ToggleButton from "components/toggleButton";

export const itensDesejoEnum = {
  materiaPrima: "Matéria Prima",
  ativos: "Construção Civil",
  alimentos: "Alimentos",
  bensDeConsumo: "Bens de Consumo"
};

class IntencaoItemComponent extends React.Component {
  static propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    onChange: function (e, id, enumText) {
      if (!e) {
        return new Error("Too few arguments. Should have event.");
      }
      if (!id) {
        return new Error("Too few arguments. Should have id.");
      }
      if (!enumText) {
        return new Error("Too few arguments. Should have enumText.");
      }
    }
  };

  render() {
    const { title, test, id, checked, onChange } = this.props;

    return (
      <div className="col-sm-12">
        <div className="form-group row">
          <label>
            <ToggleButton checked={checked} id={id} onChange={(e) => onChange && onChange(e, id, title)} title={test} test={test} />
            {title}
          </label>
        </div>
      </div>
    );
  }
}

export default IntencaoItemComponent;
