import React, { Component } from "react";
import { Link } from "react-router-dom";

class User extends Component {
  render() {
    const { user, postsCount, commentsCount } = this.props;
    return (
      <div className="row justify-content-between">
        <div className="col-6 text-left">
          <Link to={`/${user.id}`}>
            <h3>{user.name}</h3>
          </Link>
        </div>
        <div className="col text-center">
          <h5>{postsCount}</h5>
        </div>
        <div className="col text-center">
          <h5>{commentsCount}</h5>
        </div>
      </div>
    );
  }
}

export default User;
