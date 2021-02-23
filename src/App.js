import logo from './logo.svg';
import './App.css';
import React from 'react';
import Menu from './components/menu';
import Workspace from './components/workspace';
import {API} from './config';
import {CHANNELS} from "./dummyData"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentChannel: window.location.pathname.slice(1), //maybe better change to enum
      channels: new Array()
    };

    this.promises = [
      {promise: this.getChannels(), then: res => this.setState({
        channels: res
      })}
    ];
  };

  componentDidMount() {
    this.promises.forEach(element => element.promise.then(element.then));
  };

  changeChannel(channel) {
    this.setState({
      currentChannel: channel
    });
  };

  async getChannels() {
    //return await fetch(API + "/channels").then((res) => res.json().channels);
    return await CHANNELS;
  };

  render() {
    return (
      <div className="App">
        Poor Slack
        <Menu
          current={this.state.currentChannel}
          channelList={this.state.channels}
          changeChannel={this.changeChannel.bind(this)}
        />
        <Workspace
          channel={this.state.currentChannel}
          channelList={this.state.channels}
        />
      </div>
    );
  };
};

export default App;
