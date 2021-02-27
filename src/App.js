import logo from './logo.svg';
import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  NavLink,
  Switch,
  Route
} from 'react-router-dom';
import {
  getChannels
} from "./utils/fetch";
import Notifi from "./components/notification";
import { NoChannel, Welcome } from './components/screens';
import Chat from './components/chat';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      channels: new Array(),
    };

    this.promises = [
      {promise: getChannels(), then: channels => this.updateChannels(channels)}
    ];
  };

  componentDidMount() {
    this.promises
      .forEach(element => 
        element.promise.then(element.then)
      );
  };

  updateChannels (channels) {
    this.setState({
      channels
    });
    getChannels().then(channels => this.updateChannels(channels));
  };

  createPath(channel) {
    return (
      <Route path={`/${channel.id}`} key={channel.id}>
        <Chat channel={channel} />
      </Route>
    );
  };

  createLink(channel) {
    return (
      <li key={channel.id}>
        <NavLink to={`/${channel.id}`} activeClassName="current">{channel.name}</NavLink>
        <Notifi />
      </li>
    );
  };

  render() {
    const channels = this.state.channels;
    const links = channels.map(channel => this.createLink(channel));
    const pathes = channels.map(channel => this.createPath(channel));

    return (
      <div className="App">
        <img src={logo}></img>
        Poor Slack
        <Router>
          <div>
            <nav>
              <ul>
                {links}
              </ul>
            </nav>
            <Switch>
              <Route exact path="/">
                <Welcome />
              </Route>
                {pathes}
              <Route path="*" children={({location}) => (
                <NoChannel channel={location.pathname.slice(1)} />
              )} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  };
};

export default App;