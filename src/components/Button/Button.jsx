import { Component } from 'react';
import PropTypes from 'prop-types';
import style from './Button.module.css';

class Button extends Component {
  render() {
    const { nextPage } = this.props;
    return (
      <button onClick={nextPage} className={style.button}>
        {'+'}
      </button>
    );
  }
}

export default Button;
