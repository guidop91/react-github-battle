import React from "react";
import Popular from './components/Popular';
import Battle from './components/Battle';

export default class App extends React.Component {
  render() {
    return (
      <div className='container'>
        <Popular />
      </div>
    )
  }
}
