import { Component } from 'react';
import PropTypes from 'prop-types';
import style from './Statistics.module.css';

class Statistics extends Component {
  render() {
    //! need to display: actually images loaded (12*activePage),
    const { loadedImages, toLoad } = this.props;
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
}

Statistics.propTypes = {
  loadImages: PropTypes.number,
  toLoad: PropTypes.number,
};

export default Statistics;
