import React from 'react';

class DummyScreen extends React.Component {

};

export class Welcome extends DummyScreen {
    render() {
        return <div>Welcome!</div>
    };
};

export class NoChannel extends DummyScreen {
    render() {
        return <div>No channel "{this.props.channel}"</div>
    };
};