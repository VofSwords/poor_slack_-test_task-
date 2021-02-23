import React from 'react';

class Menu extends React.Component {
    render() {
        return (
            <nav>
                {this.props.channelList
                .map(channel => {
                    return (<a
                        href={channel.id}
                        className={channel.id === this.props.current ? "currentChannel" : ""}
                        key={channel.id}
                        onClick={event => {
                            event.preventDefault();
                            this.props.changeChannel(channel.id);
                            const oldElements = document.getElementsByClassName("currentChannel");
                            for (const element of oldElements) {
                                element.classList.remove("currentChannel");
                            };
                            event.target.classList.add("currentChannel");
                            window.history.pushState(null, "Channel " + channel.id, channel.id);
                        }}>
                        {channel.name}
                    </a>)
                })}
            </nav>
        );
    };
};

export default Menu;