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
      winner: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectMatch = this.handleSelectMatch.bind(this);
    this.handleFight = this.handleFight.bind(this);
  }

  handleChange(e) {
    const name = e.target.name;
    let value = e.target.value;
    if (name === "seed" && value !== "") {
      if (value > 9) { return; }
      if (value < 1 ) { return; }
    }
    this.setState({ [name]: value });
  }

  async handleSubmit(e) {
    e.preventDefault();
    this.setState({ seed: "", winner: "", errorMessage: null })
    try {
      const { data } = await axios.get('api/characters', { params: { characters: [this.state.fighter1, this.state.fighter2] } });
      this.setState({ characters: data.characters });
    } catch(error) {
      console.log(error);
      this.setState( {errorMessage: "Something went wrong.  We're looking into it"})
    }
  }

  handleFight(e) {
    e.preventDefault();
    const winner = this.determineWinner();
    this.setState({ winner })
  }

  handleSelectMatch(outerIndex, innerIndex) {
    this.setState((prevState) => {
      const characters = prevState.characters.map(c => [...c]);
      const selectedCharacter = prevState.characters[outerIndex][innerIndex];
      characters[outerIndex] = [selectedCharacter];
      return { characters };
    });
  }

  determineWinner() {
    const seed = parseInt(this.state.seed, 10);
    const character1 = this.state.characters[0][0];
    const character2 = this.state.characters[1][0];
    const description1 = character1.description;
    const description2 = character2.description;
    const words1 = description1.split(" ");
    const words2 = description2.split(" ");

    if (words1.length < seed && words2.length >= seed) {
      return character2.name;
    }
    if (words2.length < seed && words1.length >= seed) {
      return character1.name;
    }
    if (words1.length < seed && words2.length < seed) {
      return "tie";
    }

    const rawWord1 = words1[seed-1];
    const rawWord2 = words2[seed-1];
    // gets rid of punctation and normalizes capitalization
    const word1 = rawWord1.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ").toLowerCase();
    const word2 = rawWord2.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ").toLowerCase();

    if (word1 === "gamma" || word1 === "radioactive") {
      if (word2 === "gamma" || word2 === "radioactive")  {
        return "tie";
      }
      return character1.name;
    }

    if (word2 === "gamma" || word2 === "radioactive") {
      return character2.name;
    }

    if(word1.length > word2.length) {
      return character1.name;
    }
    if (word2.length > word1.length) {
      return character2.name;
    }
    return "tie"
  }

  render() {
    const disabled = this.state.fighter1.length === 0 || this.state.fighter2.length === 0;
    const mainClass = this.state.errorMessage ? "main-with-error" : "main";
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
        {this.state.errorMessage &&
          <div className="error">{this.state.errorMessage}</div>}
        <div className={mainClass}>
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
          {this.state.characters.length > 0 && this.state.characters[0].length === 1 && this.state.characters[1].length === 1 &&
            <div>
              <div className="helper-text">
                Please enter a number between 1 and 9
              </div>
              <div className="seed">
                <input type="number" min="1" max="9" name="seed" placeholder="5" value={this.state.seed} onChange={this.handleChange} />
                <label className="floating-label">Seed</label>
              </div>
              <div>
                <button className="button" disabled={this.state.seed === ""} onClick={this.handleFight}>Fight</button>
              </div>
            </div>}
            {this.state.winner.length > 0 &&
              <div className="helper-text">{this.state.winner === "tie" ? "The fighters are evenly matched" : `${this.state.winner} wins`}</div>}
          </div>
          <div className="footer">
            Data provided by Marvel. © 2014 Marvel
          </div>
      </div>
    );
  }
}
