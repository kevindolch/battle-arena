import React from "react"

const ChooseCharacter = (props) => {
  const names = props.matches.map((m, i) => (
    <li key={m.id}><span className="item" onClick={() => props.handleSelectMatch(props.index, i)} value={i}>{m.name}</span></li>
  ));
  return <div className="character-box">
    <div>Your search did not return an exact match.  Did you mean one of the following?</div>
    <ul className="list">{names}</ul>
  </div>
};

export default ChooseCharacter;
