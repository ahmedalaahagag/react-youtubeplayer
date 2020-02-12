import React from 'react';
import HgoPlayer from "./HgoPlayer";
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import GlobalStyle from "../styles/GlobalStyle";

// Not found component
const App = () => (
    <BrowserRouter>
        <>
        <Switch>
            <Route exact path="/" component={HgoPlayer}/>
            <Route exact path="/:activeVideo" component={HgoPlayer}/>
        </Switch>
        <GlobalStyle/>
        </>
    </BrowserRouter>
);

export default App;
