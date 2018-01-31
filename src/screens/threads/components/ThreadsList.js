import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions, selectors, NAME } from '../ducks';
import ThreadItem from './ThreadItem';

class ThreadsList extends Component {
  componentDidMount() {
    this.props.getThreadsData();
  }
  render() {
    let { threadsById, usersById, limit } = this.props;
    return (
      <ul className='list-group threads-list my-5'>
        {Object.keys(threadsById).map(id => {
          let thread = threadsById[id];
          let user = usersById[thread.user_id];
          return <ThreadItem key={id} {...thread} user={user} />
        })}
      </ul>
    );
  }
}

function mapStateToProps(state) {
  return state[NAME]
}

export default connect(mapStateToProps, actions)(ThreadsList);
