import React from 'react';
import Loader from "./loader/Loader";

export default function Login(props) {
    const {handleSubmit, handleChange, loading} = props;
    return (
        <React.Fragment>
            <div className="flex-container">
                {loading === true
                    ? <Loader/>
                    : <form className="form-inline" onSubmit={handleSubmit}>
                        <input type="text" className="form-control mb-2 mr-sm-2" maxLength="10"
                               placeholder="Enter Username" onChange={handleChange}/>
                        <button type="submit" className="btn btn-primary mb-2">Chat!</button>
                    </form>
                }
            </div>
        </React.Fragment>
    )
}