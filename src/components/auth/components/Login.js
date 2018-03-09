import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signInWithGoogle, signOut } from 'api/firebase';
import { STATE_KEY } from '../state';
import '../styles.css';

class Login extends Component {
  render() {
    return !this.props.loading ?
    (
      <div styleName="container">
        <h4 styleName="title">Please authenticate to gain access</h4>
        {
          this.props.authenticated ?
          <button styleName="btn" className="btn btn-danger" onClick={signOut}>Sign out</button> :
          <button styleName="btn" className="btn btn-danger" onClick={signInWithGoogle}>Sign in with google</button>
        }
      </div>
    ) :
    null;
  }
}

function mapStateToProps(state) {
  return state[STATE_KEY]
}

export default connect(mapStateToProps, null)(Login);
