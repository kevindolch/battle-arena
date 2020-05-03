import React from "react"
import PropTypes from "prop-types"
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fighter1: "",
      fighter2: "",
      seed: ""
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault()
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
          <input type="submit" onSubmit={this.handleSubmit} />
        </div>
      </div>
    );
  }
}

export default App
