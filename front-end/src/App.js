import React from 'react';
import InputButton from './components/InputButton';

class App extends React.Component {
  render() {
    return <div className="App">
      <div className="ui message">
        <div className="header">
          Scan articles for links
        </div>
        <p>Set the desired number of pages to scan at blog.risingstack.com, then press the button to get all articles that has no reference to risingstack.com.</p>
      </div>
      <InputButton />
    </div>
  }
}

export default App;
