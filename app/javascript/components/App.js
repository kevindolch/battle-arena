import React from "react"
import PropTypes from "prop-types"
import axios from "axios";
import Character from "./Character";
import ChooseCharacter from "./ChooseCharacter";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fighter1: "",
      fighter2: "",
      seed: "",
      characters: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectMatch = this.handleSelectMatch.bind(this);
  }

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
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
    const characters = this.state.characters.map((c, i) => (
      c.length > 1 ? <ChooseCharacter matches={c} index={i} key={i} handleSelectMatch={this.handleSelectMatch} /> : <Character {...c[0]} key={i} />
    ));
    return (
      <div>
        <div>
          Please enter two Marvel characters you wish to battle
        </div>
        <div>
          <input type="text" name="fighter1" onChange={this.handleChange} />
        </div>
        <div>
          <input type="text" name="fighter2" onChange={this.handleChange} />
        </div>
        <div>
          Please enter a seed number between 1 and 9
        </div>
        <div>
          <input type="number" min="1" max="9" name="seed" onChange={this.handleChange} />
        </div>
        <div>
          <button onClick={this.handleSubmit}>Submit</button>
        </div>
        <div>
          {characters}
        </div>
        <div>
          Data provided by Marvel. © 2014 Marvel
        </div>
      </div>
    );
  }
}
