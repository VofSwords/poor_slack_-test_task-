import React from 'react';
import Message from './message';
import Input from './input';
import {NoMessages} from './screens';
import {getMessages} from "../utils/fetch";

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: new Array(),
            lastMessage: 0,
            allowUpdate: false  //necessary to prevent a situation
                                //when the update arrives before the messages are loaded
        };
        this.updateChain = getMessages(this.props.channel.id);
        this.promises = [{
                promise: this.updateChain,
                then: messages => {
                    this.setState({
                        messages,
                        lastMessage: this.getLastMessageId(messages),
                        allowUpdate: true
                    });
                    this.updateMessages();
                }
            }
        ];
    };

    componentDidMount() {
        this.promises
          .forEach(element => 
            element.promise.then(element.then)
          );
    };

    updateMessages() {
        this.updateChain = this.updateChain
            .then(() => this.getUpdate());
    };
    async getUpdate() {
        const newMessages = this.props.channel.lastMessage - this.state.lastMessage;
        if (newMessages > 0) {
            const messages = this.state.messages
                .concat(await getMessages(this.props.channel.id, newMessages));
            this.setState({
                messages,
                lastMessage: this.getLastMessageId(messages)
            });
        }

        return;
    };

    getLastMessageId(messages) {
        if (!messages.length) return -1;
        return messages[messages.length - 1].id;
    };

    createMessage(message) {
        return (
            <div key={message.id}>
                <Message message={message}/>
            </div>
        );
    };

    render() {
        let content;

        if (this.state.allowUpdate) this.updateMessages();
        
        if (this.state.lastMessage === -1) {
            content = <NoMessages key="0" />
        } else {
            content = this.state.messages
                .map(message => this.createMessage(message));
        };
        return (
            <div>
                <div>
                    {content}
                </div>
                <Input />
            </div>
        );
    };
}

export default Chat;