import React, { Component } from 'react';

class FormPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postInput: ''
    }
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      postInput: nextProps.postInput
    })
  }
  changeHandler(event) {
    this.setState({
      [event.target.id]: event.target.value
    })
  }
  submitHandler(event) {
    event.preventDefault();
    this.props.submitPost(this.state.postInput);
  }
  render() {
    return (
      <form className="mb-3" onSubmit={this.submitHandler}>
        <div className="form-group">
          <label htmlFor="postInput">Write your post:</label>
          <textarea rows="3" required
            placeholder="What you like to say?"
            id="postInput" className="form-control"
            value={this.state.postInput}
            onChange={this.changeHandler}>
          </textarea>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
     )
  }
}

export default FormPost;
