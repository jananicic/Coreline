import React, {Component} from 'react';

import {getUsers} from '../../axios/axios';
import User from './User';
import ChatBox from "../chatbox/ChatBox";

export class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            selectedUserId: 0
        }
    }

    componentDidMount() {
        getUsers.bind(this)();
    }

    /**
     * Set selected user id state to the selected user.
     * @param id
     */
    setSelectedUser = id => {
        const newState = {
            ...this.state,
            selectedUserId: id
        };
        this.setState(newState);
    };

    /**
     * Get username from selected user.
     * @param id
     * @returns {any[]}
     */
    getSelectedUserName = id => {
        return this.state.users.map(value => {
            if (value.id === id) {
                return value.name;
            }
        });
    };

    render() {
        const {users, selectedUserId} = this.state;
        return (
            <React.Fragment>
                {this.state.selectedUserId === 0
                    ? <div className="usersList">
                        <h1 style={{marginBottom: '30px'}}>
                            Choose who to <label style={{color: '#007bff'}}>chat</label> with:
                        </h1>
                        <ul className="ulUsersList">
                            {users.map((user) => {
                                if (user.id !== this.props.userId) {
                                    return <User user={user} setSelectedUser={this.setSelectedUser}/>
                                }
                            })}
                        </ul>
                    </div>
                    : <ChatBox userId={this.props.userId} accessToken={this.props.accessToken}
                               selectedUserId={selectedUserId}
                               selectedUserName={this.getSelectedUserName(selectedUserId)}
                               setSelectedUser={this.setSelectedUser}/>
                }
            </React.Fragment>
        );
    }
}

export default Users;