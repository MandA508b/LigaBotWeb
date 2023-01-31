import React from 'react';
import {useLocation} from "react-router-dom";

const Redact = () => {
    const location = useLocation()
    return (
        <div>
            {location.pathname}
        </div>
    );
};

export default Redact;