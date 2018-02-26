import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { truncate } from 'utils/helpers';

import styles from '../styles.css';

const ThreadItem = props => {
  if(props.user) {
    var name = props.user.first_name + ' ' + props.user.last_name;
    var { avatar } = props.user;
  }
  return (
    <li styleName="thread-item" className="list-group-item">
      <Link to={`thread/${props.id}`}>
        <h4>{props.title.charAt(0).toUpperCase() + props.title.slice(1)}</h4>
        <p>{truncate(props.description)}</p>
      </Link>
      {
        props.user &&
        <h6 styleName="user">
          posted by{' '}
          <Link to={`user/${props.user_id}`}>
            <strong>{name}</strong> <img src={avatar}alt="" />
          </Link>
        </h6>
      }
    </li>
  );
};

ThreadItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  user: PropTypes.object
};

export default ThreadItem;