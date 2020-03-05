import React from 'react';
import PropTypes from 'prop-types';
import styles from './tooltipStyles';
import Hover from './Hover';

function Tooltip({ text, children }) {
  return (
    <Hover>
      {(hovering) => (
        <div style={styles.container}>
          {hovering === true && <div style={styles.tooltip}>{text}</div>}
          {children}
        </div>
      )}
    </Hover>
  )
}

Tooltip.propTypes = {
  text: PropTypes.string.isRequired
};

export default Tooltip;