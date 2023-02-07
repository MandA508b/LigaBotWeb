import React from 'react';
import {Route, Routes} from "react-router-dom";
import Create from "./pages/Create";
import Redact from "./pages/Redact";
const url = 'http://185.25.118.136:5000'
const App = () => {
    return (
        <Routes>
            <Route path={'/'} element={<Create url={url}/>}/>
            <Route path={'/redact/:id'} element={<Redact url={url}/>}/>
        </Routes>
    );
};

export default App;
