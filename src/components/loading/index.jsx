import React from 'react';
import './style.css';

class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      percent: 0,
    }
  }

  countPercent = () => {
    let { percent } = this.state;
    return this.setState({ percent: percent + 1 });
  }

  timer = (tempo) => {
    const { responseMs } = this.props;
    const { percent } = this.state;
    const contando = window.setInterval(() => {
      this.countPercent();
    }, responseMs);

    if (percent > tempo || percent === undefined) {
      return window.clearInterval(contando);
    }

    return percent;
  }

  render() {
    const { children, hasPercent } = this.props;
    const { percent } = this.state;

    return (
      <div className="lds-wrapper">
        <div className="lds-dual-ring">
          {hasPercent && <span className="lds-counter">{`${this.timer(100) === undefined ? 100 : percent}%`}</span>}
        </div>
        {children}
      </div>
    );
  }
}

export default Loading;
