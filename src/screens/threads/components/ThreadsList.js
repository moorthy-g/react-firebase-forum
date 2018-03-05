import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions, selectors, STATE_KEY } from '../state';
import ThreadItem from './ThreadItem';

class ThreadsList extends Component {
  constructor() {
    super();
    this.scrollHandler = this.scrollHandler.bind(this);
  }
  scrollHandler() {
    let element = document.documentElement || document.body;
    let offset = 200;
    if(element.clientHeight + element.scrollTop + offset >= element.scrollHeight && !this.props.loading)
      this.props.getMoreThreads();
  }
  componentDidMount() {
    this.props.getThreads();
    if(!this.props.freeze)
      document.addEventListener('scroll', this.scrollHandler);
  }
  componentWillUnmount() {
    if(!this.props.freeze)
      document.removeEventListener('scroll', this.scrollHandler);
  }
  render() {
    let { threadsById, usersById, limit, loading, freeze } = this.props;
    if(freeze)
      document.removeEventListener('scroll', this.scrollHandler);
    return (
      <ul className='list-group threads-list my-5'>
        {Object.keys(threadsById).map(id => {
          let thread = threadsById[id];
          return <ThreadItem key={id} id={id} {...thread} />
        })}
        { loading && <li className="list-group-item text-center">Loading...</li> }
      </ul>
    );
  }
}

function mapStateToProps(state) {
  return state[STATE_KEY]
}

export default connect(mapStateToProps, actions)(ThreadsList);
