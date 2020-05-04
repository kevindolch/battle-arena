import React from "react";

const Character = props => (
  <div>
    <div>{props.name}</div>
    <div>{props.description}</div>
    <img style={{ height: "300px", width: "300px"}} src={`${props.thumbnail.path}.${props.thumbnail.extension}`} />
  </div>
);

export default Character;
