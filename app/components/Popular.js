import React from 'react';
import PropTypes from 'prop-types';
import { fetchPopularRepos } from '../utils/api';

export default class Popular extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedLanguage: 'All',
      repos: null,
      error: null
    }
    this.updateLanguage = this.updateLanguage.bind(this);
    this.isLoading = this.isLoading.bind(this);
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage(selectedLanguage) {
    this.setState({
      selectedLanguage,
      error: null,
      repos: null
    })

    fetchPopularRepos(selectedLanguage)
      .then(repos => this.setState({
        repos,
        error: null
      }))
      .catch(() => {
        console.warn(`Error while fetching ${selectedLanguage}`);
      });
  }

  isLoading() {
    return this.state.error === null 
      && this.state.repos === null;
  }


  render () {
    const { selectedLanguage, error, repos } = this.state;
    return (
      <React.Fragment>
        <LanguagesNav
          updateLanguage={this.updateLanguage}
          selectedLanguage={selectedLanguage}
        />
        {this.isLoading() && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {repos && <pre>{JSON.stringify(repos, null, 2)}</pre>}
      </React.Fragment>
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