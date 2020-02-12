import React from 'react';
import PropTypes from 'prop-types';

export default class Popular extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedLanguage: 'All'
    }
    this.updateLanguage = this.updateLanguage.bind(this)
  }

  updateLanguage(selectedLanguage) {
    this.setState({
      selectedLanguage
    })
  }
  render () {
    return (
      <LanguagesNav
        updateLanguage={this.updateLanguage}
        selectedLanguage={this.state.selectedLanguage}
      />
    )
  }
}

function LanguagesNav ({ updateLanguage, selectedLanguage }) {
  const languages = ['All', 'Javascript', 'Python', 'Java', 'PHP', 'C'];
  const btnClass = (language) => selectedLanguage === language
    ? 'btn-clear nav-link highlighted'
    : 'btn-clear nav-link';
  return (
    <ul className='flex-center'>
      {languages.map((language) => (
        <li key={language}>
          <button
            className={btnClass(language)}
            onClick={() => updateLanguage(language)}>
            {language}
          </button>
        </li>
      ))}
    </ul>
  )
}

LanguagesNav.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  updateLanguage: PropTypes.func.isRequired
}