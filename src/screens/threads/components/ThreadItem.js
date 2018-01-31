import React from 'react';
import PropTypes from 'prop-types';
import { truncate } from 'utils/helpers';

import styles from '../styles.css';

const ThreadItem = props => {
  return (
    <li styleName="thread-item" className="list-group-item">
      <h4>{props.title.charAt(0).toUpperCase() + props.title.slice(1)}</h4>
      <p>{truncate(props.description)}</p>
      <h6 styleName="user">posted by {props.user.first_name}</h6>
    </li>
  );
};

ThreadItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  user: PropTypes.object
}

export default ThreadItem;
