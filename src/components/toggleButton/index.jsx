import React from "react";
import PropTypes from "prop-types";
import "./index.css";

class ToggleButton extends React.PureComponent {
  static propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
  };

  state = {
    checked: false
  };

  handleClick = () => {
    this.setState({ checked: !this.state.checked });
  };

  render() {
    const { id, name, onClick, checked, test, ...restProps } = this.props;

    return (
      <div className="switch switch--default">
        <label className={`switch-toggle switch-toggle--${this.state.checked ? "on" : "off"}`}>
          <input
            type="checkbox"
            name={name}
            checked={checked || this.state.checked}
            key={id}
            id={id}
            value={this.state.checked}
            data-test={test || ''}
            onClick={() => {
              this.handleClick();
              return onClick && onClick();
            }}
            {...restProps}
          />
        </label>
      </div>
    );
  }
}

export default ToggleButton;
