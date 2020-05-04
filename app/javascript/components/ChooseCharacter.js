import React from "react"

const ChooseCharacter = (props) => {
  const names = props.matches.map((m, i) => (
    <li onClick={() => props.handleSelectMatch(props.index, i)} value={i} key={m.id}>{m.name}</li>
  ));
  return <div>
    <div>Your search did not return an exact match.  Did you mean one of the following?</div>
    <ul>{names}</ul>
  </div>
};

export default ChooseCharacter;
