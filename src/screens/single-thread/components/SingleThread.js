import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import User from 'components/user';
import { setDocumentTitle } from 'utils/helpers';
import { actions, STATE_KEY } from '../state';
import PostItem from './PostItem';
import FormPost from './FormPost';
import '../styles.css';

class SingleThread extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getThread(id);
  }
  loaderElement() {
    return (
      <div className="jumbotron bg-light mt-5 p-5 text-center" styleName="single">
        <h1 className="display-4">Loading...</h1>
      </div>
    )
  }
  render() {
    setDocumentTitle(this.props.thread.title);

    if(this.props.loading)
      return this.loaderElement();

    const { id, thread, posts, postsLoading, submitPost, postInput } = this.props;
    const { title, description, user_id } = thread;
    return (
      <div>
        <div className="jumbotron bg-light mt-5 p-5" styleName="single">
          <h1 className="display-4">{title}</h1>
          <p className="lead">{description}</p>
          <hr/>
          <User styleName="user" id={user_id} />
        </div>
        { !postsLoading && posts[id] && posts[id].map(post => <PostItem key={post.id} {...post} /> ) }
        <FormPost submitPost={submitPost} postInput={postInput} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state[STATE_KEY];
}

export default connect(mapStateToProps, actions)(SingleThread);
