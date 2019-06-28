import React from 'react';

export function Loader() {
    return (
        <div className="loaderMain">
            <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
}

export default Loader