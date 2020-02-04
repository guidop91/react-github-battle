import React from "react";
import ReactDOM from "react-dom";
import './index.css';

class App extends React.Component {
  render() {
    const auth = true;
    if (auth) {
      return <h1>Welcome back!</h1>
    }
    return (
      <div><h1>Log In to see your dashboard</h1></div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
