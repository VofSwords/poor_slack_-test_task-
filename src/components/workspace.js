import React from 'react';
import Chat from './chat';
import {Welcome, NoChannel} from './screens';

class Workspace extends React.Component {
    isChannel(channel) {
        return this.props.channelList
        .filter(e => e.id === channel)
        .length === 1 ? true : false;
    };

    render() {
        const channel = this.props.channel;

        let screen;

        if (this.isChannel(this.props.channel)) {
            screen = <Chat channel={channel} />
        } else if (channel === "") {
            screen = <Welcome />
        } else {
            screen = <NoChannel channel={channel} />
        };
        return screen;
    };
};

export default Workspace;