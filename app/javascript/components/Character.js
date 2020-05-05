import React from "react";

const Character = props => (
  <div  className="character-box">
    <div><strong>{props.name}</strong></div>
    <img style={{ height: "300px", width: "300px"}} src={`${props.thumbnail.path}.${props.thumbnail.extension}`} />
    <div>{props.description}</div>
  </div>
);

export default Character;
