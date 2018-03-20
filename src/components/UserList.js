import React, { Component } from "react";
import User from "./User";

class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: props.users,
      orderded: "",
      reversed: false
    };
  }

  orderUsers(by) {
    if (by === "byName") {
      let users = [].concat(this.state.users).sort((a, b) => {
        let nameAArr = a.name.split(" ");
        let nameBArr = b.name.split(" ");
        let nameA = nameAArr[nameAArr.length - 1].toUpperCase();
        let nameB = nameBArr[nameBArr.length - 1].toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      return users;
    } else if (by === "byPosts") {
      let users = [].concat(this.state.users).sort((a, b) => {
        let postsA = a.posts.length;
        let postsB = b.posts.length;
        if (postsA < postsB) {
          return -1;
        }
        if (postsA > postsB) {
          return 1;
        }
        return 0;
      });
      return users;
    } else if (by === "byComments") {
      let users = [].concat(this.state.users).sort((a, b) => {
        let commentsCountA = a.commentsCount;
        let commentsCountB = b.commentsCount;
        if (commentsCountA < commentsCountB) {
          return -1;
        }
        if (commentsCountA > commentsCountB) {
          return 1;
        }
        return 0;
      });
      return users;
    }
  }

  toggleOrder = ordered => {
    if (this.state.ordered === ordered) {
      let users = [].concat(this.state.users.reverse());
      this.setState({
        reversed: !this.state.reversed,
        users: users
      });
    } else {
      let users = this.orderUsers(ordered);
      this.setState({
        users: users,
        ordered: ordered,
        reversed: false
      });
    }
  };

  renderUsers() {
    return this.state.users.map(user => (
      <User
        key={user.username}
        user={user}
        postsCount={user.posts.length}
        commentsCount={user.commentsCount}
      />
    ));
  }

  render() {
    return (
      <div>
        <div className="row justify-content-between">
          <div className="col-4 col-md-6">
            <button
              type="button"
              className="btn btn-light btn-block"
              onClick={this.toggleOrder.bind(this, "byName")}
            >
              Name{" "}
              {this.state.reversed && this.state.ordered === "byName" ? (
                <span>&#8593;</span>
              ) : (
                <span>&#8595;</span>
              )}
            </button>
          </div>
          <div className="col">
            <button
              type="button"
              className="btn btn-light btn-block"
              onClick={this.toggleOrder.bind(this, "byPosts")}
            >
              Posts{" "}
              {this.state.reversed && this.state.ordered === "byPosts" ? (
                <span>&#8593;</span>
              ) : (
                <span>&#8595;</span>
              )}
            </button>
          </div>
          <div className="col">
            <button
              type="button"
              className="btn btn-light btn-block"
              onClick={this.toggleOrder.bind(this, "byComments")}
            >
              Comments/Post{" "}
              {this.state.reversed && this.state.ordered === "byComments" ? (
                <span>&#8593;</span>
              ) : (
                <span>&#8595;</span>
              )}
            </button>
          </div>
        </div>
        <div>
          <div>{this.renderUsers()}</div>
        </div>
      </div>
    );
  }
}

export default UserList;
