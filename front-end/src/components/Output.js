import React from 'react';

class Output extends React.Component {
  render() {
    const { links } = this.props;
    if(links !== undefined && links.length !== 0) {
      return <div className='ui segment' style={{padding: '1em'}}>
        <ul className="ui list">
          {links.map(link => {
            return <li key={link.link}><a href={link.link}>{link.title}</a></li>
          })}
        </ul>
      </div>
    } else {
      return <></>
    }
  }
}

export default Output;