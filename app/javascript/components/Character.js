import React from "react";

const Character = props => (
  <div  className="character-box">
    <div><strong><a href={props.url}>{props.name}</a></strong></div>
    <img style={{ height: "300px", width: "300px"}} src={`${props.thumbnail.path}.${props.thumbnail.extension}`} />
    <div>{props.description}</div>
  </div>
);

export default Character;
