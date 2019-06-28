import React from 'react';

export default function Message(props) {
    return (
        <p className="message" key={props.index}>{props.value}</p>
    );
}