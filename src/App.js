import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import React from 'react';
import {Route, Routes} from "react-router-dom";
import Create from "./pages/Create";
import Redact from "./pages/Redact";
import YourPrice from "./pages/YourPrice/YourPrice";
import Review from "./pages/Review";
import Error404 from "./components/Error404";

const url = 'https://ligabot.pp.ua'
const App = () => {
    return (
        <Routes>
            <Route path={'/'} element={<Create url={url}/>}/>
            <Route path={'/redact/:id'} element={<Redact url={url}/>}/>
            <Route path={'/rate'} element={<YourPrice url={url}/>}/>
            <Route path={'/review'} element={<Review url={url}/>}/>
            <Route path={'*'} element={<Error404/>}/>
        </Routes>
    );
};

export default App;