import React from "react"
import PropTypes from "prop-types"
import axios from "axios";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fighter1: "",
      fighter2: "",
      seed: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    } catch(error) {
      console.error(error);
    }
  }

  render() {
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
          Data provided by Marvel. © 2014 Marvel
        </div>
      </div>
    );
  }
}

export default App
