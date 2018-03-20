import React, { Component } from "react";
import { Link } from "react-router-dom";
import Post from "./Post";

class UserDetail extends Component {
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
  renderPosts() {
    return this.props.user.posts.map(post => (
      <Post
        key={post.title}
        title={post.title}
        body={post.body}
        comments={post.comments}
      />
    ));
  }
  render() {
    const { user } = this.props;
    return (
      <div>
        <Link to={"/"}>
          <p>Home</p>
        </Link>
        <h2 className="username">{user.username}</h2>
        <div className="row">
          <div className="col-12 col-md-8">{this.renderPosts()}</div>
          <div className="col" id="sidebar">
            <button
              type="button"
              className="btn btn-light btn-block"
              onClick={this.toggleHidden.bind(this)}
            >
              User Details
            </button>
            {!this.state.isHidden && (
              <div>
                <u>{user.name}</u>
                <br />
                <small class="text-muted">{user.email}</small>
                <address>
                  {user.address.street}
                  <br />
                  {user.address.suite}
                  <br />
                  {user.address.city}
                </address>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default UserDetail;
