import React from 'react';
import InputButton from './components/InputButton';
import Output from './components/Output';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      links: []
    }
  }

  setLinks = (links) => {
    this.setState({ links });
  }

  render() {
    return <div className="App">
      <div className="ui message">
        <div className="header">
          Scan articles for links
        </div>
        <p>Set the desired number of pages to scan at blog.risingstack.com, then press the button to get all articles that has no reference to risingstack.com.</p>
      </div>
      <InputButton setLinks={this.setLinks}/>
      <Output links={this.state.links}/>
    </div>
  }
}

export default App;
