import React from 'react';
import {Route, Routes} from "react-router-dom";
import Create from "./pages/Create";
import Redact from "./pages/Redact";

const App = () => {
    return (
        <Routes>
            <Route path={'/'} element={<Create/>}/>
            <Route path={'/redact/:id'} element={<Redact/>}/>
        </Routes>
    );
};

export default App;