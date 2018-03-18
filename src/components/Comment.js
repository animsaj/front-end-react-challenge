import React from "react";

const Comment = props => {
  return (
    <div>
      <small class="text-muted">
        {props.name} - {props.email}
      </small>
      <p>{props.body}</p>
    </div>
  );
};

export default Comment;
