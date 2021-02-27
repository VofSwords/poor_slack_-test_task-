import React from 'react';

class Message extends React.Component {
    render() {
        const message = this.props.message;
        return (
        <div>
            {message.from + ": " + message.text}
        </div>
        )
    };
};

export default Message;