import axios from "axios";

const URL = 'https://coreline-chat-backend.herokuapp.com';

/**
 * Get all users form server.
 * @returns {Promise<void>}
 */
export async function getUsers() {
    try {
        let res = await axios.get(`${URL}/users`);
        let {data} = res;
        const newState = {
            ...this.state,
            users: data
        };
        this.setState(newState);
    } catch (e) {
        alert(`${e}
        Error occurred while catching users.`);
    }
}

/**
 * Post new user.
 * @param name
 * @returns {Promise<void>}
 */
export async function postUser(name) {
    try {
        let res = await axios.post(`${URL}/users`, {name});
        let {data} = res;
        const newState = {
            ...this.state,
            userId: data.id,
            accessToken: data.accessToken
        };
        this.setState(newState);
        localStorage.setItem("userId", data.id);
        localStorage.setItem("accessToken", data.accessToken);
    } catch (e) {
        alert(`${e}
        Error occurred while posting new user.`);
    }
}

/**
 * Get all messages from user
 * @param id
 * @param token
 * @returns {Promise<void>}
 */
export async function getMessages(id, token) {
    try {
        let res = await axios.get(`${URL}/messages?with=${id}`, {
            headers: {
                "Access-Token": token
            }
        });
        let {data} = res;
        const newState = {
            ...this.state,
            messages: data
        };
        this.setState(newState);
    } catch (e) {
        alert(`${e}
        Error occurred while getting messages from user.`);
    }
}

/**
 * Post new message.
 * @param id
 * @param message
 * @param token
 * @returns {Promise<void>}
 */
export async function postMessage(id, message, token) {
    try {
        let res = await axios.post(`${URL}/messages`, {
            "receiverId": id,
            "message": message
        }, {
            headers: {
                "Access-Token": token
            }
        });
        this.setState({messages: [...this.state.messages, res.data.message]});
    } catch (e) {
        alert(`${e}
        Error occurred while posting message to user.`);
    }
}