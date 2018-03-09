import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from 'api/firebase';
import { STATE_KEY as authState } from 'components/auth';

const Header = props => (
  <nav className="navbar navbar-light bg-light justify-content-between">
    <Link className="navbar-brand" to='/threads'>
      <h4>React Forum</h4>
    </Link>
    {
      props.authenticated &&
      <div className="d-flex">
        <img src={props.photo} width="40" height="40" className="rounded-circle" alt="" />
        <h6 className="p-2 m-0">{props.name}</h6>
        <button className="btn btn-outline-secondary" onClick={signOut}>Signout</button>
      </div>
    }
  </nav>
)

function mapStateToProps(state) {
  return state[authState]
}

export default connect(mapStateToProps,null)(Header);
