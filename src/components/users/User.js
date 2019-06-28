import React from 'react';

export default function Users(props) {
    const {name, id} = props.user;
    return (
        <React.Fragment>
            <li key={id} onClick={() => props.setSelectedUser(id)}>
                <a href="#">{name}</a>
            </li>
        </React.Fragment>
    );
}