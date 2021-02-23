import React from 'react';

class Chat extends React.Component {
    render() {
        return (
            <div>
                {this.props.channel}
            </div>
        )
    }
}

export default Chat;