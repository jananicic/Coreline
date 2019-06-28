import React, {Component} from 'react';

import {postUser} from './axios/axios';

import Login from './components/login/Login';
import Users from './components/users/Users';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            userId: 0,
            accessToken: '',
            loading: false
        };
    }

    componentDidMount() {
        if (localStorage.getItem("accessToken") !== null) {
            const newState = {
                ...this.state,
                userId: localStorage.getItem("userId"),
                accessToken: localStorage.getItem("accessToken")
            };
            this.setState(newState);
        }
    }

    /**
     * Set loading icon to true/false.
     * @param bool
     */
    setLoadingState(bool) {
        this.setState({
            ...this.state,
            loading: bool
        });
    };

    /**
     * Set state for the loading icon to true & post new user to the server;
     * @param e
     */
    handleSubmit = e => {
        e.preventDefault();
        this.setLoadingState(true);
        postUser.bind(this)(this.state.name).then(() => this.setLoadingState(false));
    };

    /**
     * Set state for the name.
     * @param e
     */
    handleChange = e => {
        const newState = {
            ...this.state,
            name: e.target.value
        };
        this.setState(newState);
    };

    /**
     * Get access token from the state.
     * If there is no state get it from local storage.
     * If there is no access token in the local storage return empty string.
     * @returns {string}
     */
    getAccessToken = () => {
        if (this.state.accessToken !== '') {
            return this.state.accessToken;
        } else if (localStorage.getItem("accessToken") !== null) {
            return localStorage.getItem("accessToken");
        } else {
            return '';
        }
    };

    render() {
        return (
            <div className="container">
                <div className="row">
                    {this.getAccessToken() === ''
                        ? <Login handleSubmit={this.handleSubmit} handleChange={this.handleChange}
                                 loading={this.state.loading}/>
                        : <Users userId={this.state.userId} accessToken={this.state.accessToken}/>
                    }
                </div>
            </div>
        );
    }
}

export default App;
