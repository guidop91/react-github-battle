import React from 'react';
import PropTypes from 'prop-types';
import styles from './tooltipStyles';
import withHover from './withHover';

function Tooltip({ text, children, hovering }) {
  return (
    <div style={styles.container}>
      {hovering === true && <div style={styles.tooltip}>{text}</div>}
      {children}
    </div>
  )
}

Tooltip.propTypes = {
  text: PropTypes.string.isRequired,
  hovering: PropTypes.bool.isRequired
};

export default withHover(Tooltip);