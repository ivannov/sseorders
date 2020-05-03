import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Contractor from './Contractor'

class App extends Component {

    render() {
        return (
            <Router>
                <div>
                <ul>
                    <li>
                        <Link to="/alice">Alice</Link>
                    </li>
                    <li>
                        <Link to="/bob">Bob</Link>
                    </li>
                </ul>
                <Switch>
                    <Route path="/alice">
                        <Contractor name="alice"/>
                    </Route>
                    <Route path="/bob">
                        <Contractor name="bob"/>
                    </Route>
                </Switch>
                </div>
            </Router>
        )
    }
}

export default App;
