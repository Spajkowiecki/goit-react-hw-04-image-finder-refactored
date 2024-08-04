import style from './Button.module.css';

export default function Button({ nextPage }) {
  return (
    <button onClick={nextPage} className={style.button}>
      {'+'}
    </button>
  );
}
