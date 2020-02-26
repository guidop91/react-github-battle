import React from 'react';
import PropTypes from 'prop-types';
import { fetchPopularRepos } from '../utils/api';
import { FaUser, FaStar, FaCodeBranch, FaExclamationTriangle, FaCode } from 'react-icons/fa';
import Card from './Card';
import Loading from './Loading';
import Tooltip from './Tooltip';

export default class Popular extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedLanguage: 'All',
      repos: {},
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
      error: null
    });

    if (!this.state.repos[selectedLanguage]) {
      fetchPopularRepos(selectedLanguage)
        .then(data => {
          this.setState(({ repos }) => ({
            repos: {
              ...repos,
              [selectedLanguage]: data
            }
          }))
        })
        .catch(() => {
          console.warn(`Error while fetching ${selectedLanguage}`);
          this.setState({
            error: `Error while fetching ${selectedLanguage}`
          })
        });
    }
  }

  isLoading() {
    const { repos, selectedLanguage, error } = this.state;
    return !repos[selectedLanguage] && error === null;
  }


  render () {
    const { selectedLanguage, error, repos } = this.state;
    return (
      <React.Fragment>
        <LanguagesNav
          updateLanguage={this.updateLanguage}
          selectedLanguage={selectedLanguage}
        />
        {this.isLoading() && <Loading text='One moment' speed={100} />}
        {error && <p className='center-text error'>{error}</p>}
        {repos[selectedLanguage] && <ReposGrid repos={repos[selectedLanguage]} />}
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

function ReposGrid ({ repos }) {
  return (
    <ul className='grid space-around'>
      {repos.map((repo, index) => {
        const { name, owner, html_url, stargazers_count, forks, open_issues } = repo;
        const { login, avatar_url } = owner;
        return (
          <li key={html_url}>
            <Card
              avatar={avatar_url}
              header={`#${index + 1}`}
              href={html_url}
              name={login}
            >
              <ul className='card-list'>
                <li>
                  <Tooltip text={`User's Github handle`}>
                    <FaUser color='rgb(255, 191, 116' size={22} />
                    <a href={`https://github.com/${login}`}>
                      {login}
                    </a>
                  </Tooltip>
                </li>
                <li>
                  <FaStar color='rgb(255, 215, 0)' size={22} />
                  {stargazers_count.toLocaleString()} stars
                </li>
                <li>
                  <FaCodeBranch color='rgb(129, 195, 245)' size={22} />
                  {forks.toLocaleString()} forks
                </li>
                <li>
                  <FaExclamationTriangle color='rgb(241, 138, 147)' size={22} />
                  {open_issues.toLocaleString()} open issues
                </li>
              </ul>
            </Card>
          </li>
        )
      })}
    </ul>
  )
}

ReposGrid.propTypes = {
  repos: PropTypes.array
}
