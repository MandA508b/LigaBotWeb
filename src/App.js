import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import React from 'react';
import {Route, Routes} from "react-router-dom";
import Create from "./pages/Create";
import Redact from "./pages/Redact";
import YourPrice from "./pages/YourPrice/YourPrice";
const url = 'https://ligabotv2.onrender.com'
const App = () => {
    return (
        <Routes>
            <Route path={'/'} element={<Create url={url}/>}/>
            <Route path={'/redact/:id'} element={<Redact url={url}/>}/>
                <Route path={'/yourprice'} element={<YourPrice/>}/>
        </Routes>
    );
};

export default App;