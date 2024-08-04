import { Component } from 'react';
import PropTypes from 'prop-types';
import style from './Button.module.css';

export default function Button({ nextPage }) {
  return (
    <button onClick={nextPage} className={style.button}>
      {'+'}
    </button>
  );
}
