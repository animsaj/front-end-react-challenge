import React, { Component } from "react";
import Comment from "./Comment";

class Post extends Component {
  constructor() {
    super();
    this.state = {
      isHidden: true
    };
  }
  toggleHidden() {
    this.setState({
      isHidden: !this.state.isHidden
    });
  }

  renderComments() {
    return this.props.comments.map(comment => (
      <Comment name={comment.name} email={comment.email} body={comment.body} />
    ));
  }
  render() {
    const { title, body, comments } = this.props;
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{body}</p>
          <div className="card-footer">
            <span>{comments.length} comments</span>
            <button
              type="button"
              className="btn btn-dark"
              onClick={this.toggleHidden.bind(this)}
            >
              +
            </button>
          </div>
          <div>{!this.state.isHidden && this.renderComments()}</div>
        </div>
      </div>
    );
  }
}

export default Post;
