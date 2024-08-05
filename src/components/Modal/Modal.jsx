import PropTypes from 'prop-types';
import style from './Modal.module.css';

export default function Modal({ children }) {
  return (
    <div className={style.modalPosition}>
      <div className={style.backdrop}></div>
      <div className={style.modal}>{children}</div>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};
