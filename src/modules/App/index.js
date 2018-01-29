import React from 'react';
import ReactDOM from 'react-dom';
import Seconds from 'components/seconds';
import './styles.less';

class App extends React.Component {
    render() {
    return (
      <h2>
        This is a react/redux webpack boilerplate <br />
        Seconds component <Seconds />
      </h2>
    );
  }
}

export default App;
