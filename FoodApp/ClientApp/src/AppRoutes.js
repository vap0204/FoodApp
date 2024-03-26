import React from "react";
import { BrowserRouter as Router, Route, Routes, Switch } from "react-router-dom";
import App from "./App";
import AddFood from "./AddFood";

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" component={App} />
                <Route path="/add-food" component={AddFood} />
            </Switch>
        </Router>
    );
};


export default Routes;
