import React from 'react';

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

function LanguagesNav (props) {
  const { updateLanguage, selectedLanguage } = props;
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