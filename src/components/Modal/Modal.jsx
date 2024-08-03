import { Component } from 'react';
import PropTypes from 'prop-types';
import style from './Modal.module.css';

class Modal extends Component {
  render() {
    const { children } = this.props;
    return (
      <div className={style.modalPosition}>
        <div className={style.backdrop}></div>
        <div className={style.modal}>{children}</div>
      </div>
    );
  }
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Modal;
