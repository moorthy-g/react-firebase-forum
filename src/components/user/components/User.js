import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actions, STATE_KEY } from '../state';
import '../styles.css';

class User extends Component {
  componentDidMount() {
    const { id, getUser } = this.props;
    id && getUser(id);
  }
  render() {
    const user = this.props.usersById[this.props.id]
    if(typeof user !== 'object')
      return null;

    const { first_name, last_name, avatar } = user;
    const name = last_name ? `${first_name} ${last_name}` : first_name;
    return (
      <h6 styleName="user" className={this.props.className}>
        posted by{' '}
        <strong>{name}</strong>
        <img src={avatar} alt="" />
      </h6>
    )
  }
}

User.propTypes = {
  id: PropTypes.string.isRequired
}

function mapStateToProps(state) {
  return state[STATE_KEY]
}

export default connect(mapStateToProps,actions)(User);
