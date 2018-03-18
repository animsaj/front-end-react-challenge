import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";

import UserList from "./components/UserList";
import UserDetail from "./components/UserDetail";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      users: []
    };
  }

  componentDidMount() {
    let urls = [
      "https://jsonplaceholder.typicode.com/users",
      "https://jsonplaceholder.typicode.com/posts",
      "https://jsonplaceholder.typicode.com/comments"
    ];
    Promise.all(urls.map(url => fetch(url)))
      .then(resp => Promise.all(resp.map(r => r.json())))
      .then(
        result => {
          var userArray = [];
          result[0].forEach(user => {
            let newUser = Object.assign({}, user);
            let postsArray = result[1].filter(post => post.userId === user.id);
            let posts = [];
            let commentsSum = 0;
            postsArray.forEach(post => {
              let newPost = Object.assign({}, post);
              let commentsArray = result[2].filter(
                comment => comment.postId === post.id
              );
              newPost.comments = commentsArray;
              commentsSum = commentsSum + commentsArray.length;
              posts.push(newPost);
            });
            newUser.posts = posts;
            newUser.commentsCount = commentsSum / posts.length;
            userArray.push(newUser);
          });
          this.setState({
            isLoaded: true,
            users: userArray
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  render() {
    const { error, isLoaded, users } = this.state;
    if (error) {
      return <div className="container">Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div className="container">Loading...</div>;
    } else
      return (
        <div className="container">
          <Switch>
            <Route exact path="/" render={() => <UserList users={users} />} />
            <Route
              path="/:id"
              render={props => (
                <UserDetail
                  user={
                    users.filter(
                      user => user.id === parseInt(props.match.params.id, 10)
                    )[0]
                  }
                />
              )}
            />
          </Switch>
        </div>
      );
  }
}

export default App;
