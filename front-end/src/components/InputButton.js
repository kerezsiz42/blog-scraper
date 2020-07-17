import React from 'react';

class InputButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputField: '',
      links: []
    }
  }

  setInputField = (text) => {
    this.setState({ inputField: text });
  }

  sendInputValue = () => {
    fetch(`${process.env.REACT_APP_API}/getFilteredLinks?numberOfPages=${this.state.inputField}`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    })
      .then(response => response.json())
      .then(console.log)
      .catch();
  }

  render() {
    return <div style={{padding: '1em'}}>
      <div className='ui input'>
        <input onChange={(e) => this.setInputField(e.target.value)}></input>
      </div>
      <button onClick={this.sendInputValue} className='ui button'>Get Pages</button>
    </div>
  }
}

export default InputButton;