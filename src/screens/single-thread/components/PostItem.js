import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import User from 'components/user';
import '../styles.css';

const PostItem = props => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        { props.message }
      </div>
      <div className="card-footer">
        <User styleName="user" id={props.user_id} />
      </div>
    </div>
  )
}

PostItem.propTypes = {
  message: PropTypes.string.isRequired,
  user_id: PropTypes.string.isRequired
};

export default PostItem;
