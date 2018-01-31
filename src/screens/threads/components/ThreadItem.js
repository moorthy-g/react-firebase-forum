import React from 'react';
import PropTypes from 'prop-types';
import { truncate } from 'utils/helpers';

import styles from '../styles.css';

const ThreadItem = props => {
  const name = props.user.first_name + ' ' + props.user.last_name;
  const { avatar } = props.user;
  return (
    <li styleName="thread-item" className="list-group-item">
      <h4>{props.title.charAt(0).toUpperCase() + props.title.slice(1)}</h4>
      <p>{truncate(props.description)}</p>
      <h6 styleName="user">
        posted by {name} <img src={avatar} alt='' />
      </h6>
    </li>
  );
};

ThreadItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
}

export default ThreadItem;
