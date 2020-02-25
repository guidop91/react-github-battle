import React from "react";
import { battle } from "../utils/api";
import {
  FaBriefcase,
  FaCompass,
  FaUser,
  FaUserFriends,
  FaUsers
} from "react-icons/fa";
import Card from "./Card";
import PropTypes from 'prop-types';
import Loading from './Loading';

export default class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      winner: null,
      loser: null,
      loading: true,
      error: null
    };
  }
  componentDidMount() {
    const { playerOne, playerTwo, resetBattle } = this.props;

    battle([playerOne, playerTwo])
      .then(players => {
        this.setState({
          winner: players[0],
          loser: players[1],
          error: null,
          loading: false
        });
      })
      .catch(({ message }) => {
        this.setState({
          error: message,
          loading: false
        });
      });
  }
  render() {
    const { winner, loser, error, loading } = this.state;

    if (loading === true) {
      return <Loading text='One moment' speed={100} />;
    }

    if (error) {
      return <p className="center-text error">{error}</p>;
    }
    return (
      <React.Fragment>
        <div className="grid space-around container-sm">
          <Card
            avatar={winner.profile.avatar_url}
            header={winner.score === loser.score ? "Tie" : "Winner"}
            href={winner.profile.html_url}
            name={winner.profile.login}
            subheader={`Score: ${winner.score.toLocaleString()}`}
          >
            <ProfileList profile={winner.profile} />
          </Card>
  
          <Card
            avatar={loser.profile.avatar_url}
            header={winner.score === loser.score ? "Tie" : "Loser"}
            href={loser.profile.html_url}
            name={loser.profile.login}
            subheader={`Score: ${loser.score.toLocaleString()}`}
          >
            <ProfileList profile={loser.profile} />
          </Card>
        </div>
        <button className='btn dark-btn btn-space' onClick={this.props.resetBattle}>Reset</button>
      </React.Fragment>
    );
  }
}

function ProfileList({ profile }) {
  return (
    <ul className="card-list">
      <li>
        <FaUser color="rgb(239, 115, 115)" size={22} />
        {profile.name}
      </li>
      {profile.location && (
        <li>
          <FaCompass color="rgb(144, 115, 255)" size={22} />
          {profile.location}
        </li>
      )}
      {profile.company && (
        <li>
          <FaBriefcase color="#795548" size={22} />
          {profile.company}
        </li>
      )}
      <li>
        <FaUsers color="rgb(129, 195, 245)" size={22} />
        {profile.followers.toLocaleString()} followers
      </li>
      <li>
        <FaUserFriends color="rgb(64, 183, 195)" size={22} />
        {profile.following.toLocaleString()} following
      </li>
    </ul>
  );
}

ProfileList.propTypes = {
  profile: PropTypes.object.isRequired
}
