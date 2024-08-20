import style from './Statistics.module.css';

export default function Statistics({ loadedImages, toLoad }) {
  return (
    <div>
      <ul className={style.statsList}>
        <li>
          <p>
            {loadedImages > toLoad ? (
              toLoad
            ) : (
              <span>{toLoad === 0 ? 0 : loadedImages}</span>
            )}{' '}
            / <span>{toLoad}</span>
          </p>
        </li>
      </ul>
    </div>
  );
}
