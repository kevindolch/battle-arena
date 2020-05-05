import React from "react"
import PropTypes from "prop-types"
import axios from "axios";
import Character from "./Character";
import ChooseCharacter from "./ChooseCharacter";
import "../stylesheets/App.scss"

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fighter1: "",
      fighter2: "",
      seed: "",
      characters: [],
      focus: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectMatch = this.handleSelectMatch.bind(this);
  }

  handleChange(e) {
    const name = e.target.name;
    let value = e.target.value;
    if (name === "seed") {
      if (value > 9) { value = 9 }
      if (value < 1 ) { value = 1 }
    }
    this.setState({ [name]: value });
  }

  async handleSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post('api/battle_characters', { characters: [this.state.fighter1, this.state.fighter2], seed: this.state.seed });
      this.setState({ characters: data.characters });
    } catch(error) {
      console.error(error);
    }
  }

  handleSelectMatch(outerIndex, innerIndex) {
    this.setState((prevState) => {
      const characters = prevState.characters.map(c => [...c]);
      const selectedCharacter = prevState.characters[outerIndex][innerIndex];
      characters[outerIndex] = [selectedCharacter];
      return { characters }
    });
  }

  render() {
    const disabled = this.state.fighter1.length === 0 || this.state.fighter2.length === 0;
    const characters = this.state.characters.map((c, i) => {
      switch (c.length) {
        case 0:
          return <div className="character-box" key={i}>Your search didn't match anything, please try another term</div>;
        case 1:
          return <Character {...c[0]} key={i} />;
        default:
          return <ChooseCharacter matches={c} index={i} key={i} handleSelectMatch={this.handleSelectMatch} />;
      }
    });
    return (
      <div className="container">
        <div className="main">
          <div className="helper-text">
            Please enter two Marvel characters you wish to battle
          </div>
          <div className="fighters">
            <div className="fighter">
              <input className="fighter-input" type="text" placeholder="Spider-Man" name="fighter1" value={this.state.fighter1} onChange={this.handleChange} required />
                <label className="floating-label">Character</label>
            </div>
            <div className="fighter">
              <input className="fighter-input" type="text" placeholder="Captain America" name="fighter2" value={this.state.figter2} onChange={this.handleChange} required />
              <label className="floating-label">Character</label>
            </div>
          </div>
          <div>
            <button className="button" disabled={disabled} onClick={this.handleSubmit}>Search</button>
          </div>
          <div className="character-container">
            {characters}
          </div>
          {characters.length > 0 &&
            <div>
              <div className="helper-text">
                Please enter a seed number between 1 and 9
              </div>
              <div>
                <input type="number" min="1" max="9" name="seed" value={this.state.seed} onChange={this.handleChange} onFocus={this.handleFocus} />
                <label className="floating-label">Seed</label>
              </div>
            </div>}
          </div>
          <div className="footer">
            Data provided by Marvel. © 2014 Marvel
          </div>
      </div>
    );
  }
}
