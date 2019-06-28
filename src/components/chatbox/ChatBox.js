import React, {Component} from 'react';
import {getMessages, postMessage} from "../../axios/axios";
import Message from './Message'

export class ChatBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            message: ''
        }
    }

    componentDidMount() {
        //getMessages.bind(this)(this.props.userId, this.props.accessToken);
        if (localStorage.getItem('usersMessages') === null)
            localStorage.setItem("usersMessages", JSON.stringify([{id: 0, messages: ['poruka']}]));
        this.updateMessages(this.props.selectedUserId);
    }

    /**
     * Post new message to the server and set new message to the local storage.
     */
    handleSubmit = () => {
        postMessage.bind(this)(this.props.selectedUserId, this.state.message, this.props.accessToken);
        this.setMessage(this.props.selectedUserId, this.state.message);
    };

    /**
     * Update state of a message.
     * @param e
     */
    handleChange = e => {
        const newState = {
            ...this.state,
            message: e.target.value
        };
        this.setState(newState);
    };

    /**
     * Add new message to a local storage.
     * @param id
     * @param message
     */
    setMessage = (id, message) => {
        const usersMessages = JSON.parse(localStorage.getItem('usersMessages'));
        const index = usersMessages.findIndex(userMessages => userMessages.id === id);
        if (index !== -1) {
            usersMessages[index].messages.push(message);
            localStorage.setItem("usersMessages", JSON.stringify(usersMessages));
        } else {
            usersMessages.push({
                id,
                messages: [message]
            });
            localStorage.setItem("usersMessages", JSON.stringify(usersMessages))
        }
    };

    /**
     * Update state of messages with local storage.
     * @param id
     */
    updateMessages = id => {
        const usersMessages = JSON.parse(localStorage.getItem('usersMessages'));
        const index = usersMessages.findIndex(userMessages => userMessages.id === id);
        if (index !== -1) {
            this.setState({
                ...this.state,
                messages: usersMessages[index].messages
            });
        }
    };

    render() {
        return (
            <div className="chatMain">
                <div className="chatBoxHeader">
                    <i className="fas fa-angle-left favicon" onClick={() => this.props.setSelectedUser(0)}/>
                    <h4>Sending messages to: <u>{this.props.selectedUserName}</u></h4>
                </div>
                <div className="chatBox">
                    <div className="messageBox">
                        {this.state.messages.map((value, index) => {
                            return <Message value={value} index={index}/>
                        })}
                    </div>
                </div>
                <textarea className="form-control chatInput" placeholder="Enter message" onChange={this.handleChange}/>
                <button className="btn btn-primary chatButton" onClick={this.handleSubmit}> Send</button>
            </div>
        );
    }
}

export default ChatBox;