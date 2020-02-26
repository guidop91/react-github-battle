import React from 'react';
import PropTypes from 'prop-types';
import styles from './tooltipStyles';

export default class Tooltip extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hovering: false
    }
    this.mouseOver = this.mouseOver.bind(this);
    this.mouseOut = this.mouseOut.bind(this);
  }

  mouseOver() {
    this.setState({
      hovering: true
    })
  }

  mouseOut() {
    this.setState({
      hovering: false
    })
  }
  render() {
    const { text, children } = this.props;
    const { hovering } = this.state;

    return (
      <div
        onMouseOver={this.mouseOver}
        onMouseOut={this.mouseOut}
        style={styles.container}
      >
        {hovering === true && <div style={styles.tooltip}>{text}</div>}
        {children}
      </div>
    )
  }
}

Tooltip.propTypes = {
  text: PropTypes.string.isRequired
};
