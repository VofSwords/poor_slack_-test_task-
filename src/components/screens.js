import React from 'react';

class DummyScreen extends React.Component {

};

export class Welcome extends DummyScreen {
    render() {
        return <h1>Welcome!</h1>
    };
};

export class NoChannel extends DummyScreen {
    render() {
        return <h1>No channel "{this.props.channel}"</h1>
    };
};

export class NoMessages extends DummyScreen {
    render() {
        return (
            <div>
                <h1>No messages yet</h1>
                <h3>Become first to start</h3>
            </div>
        )
    }
}