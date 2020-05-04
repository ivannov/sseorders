import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Contractor from './Contractor';
import "bootstrap/dist/css/bootstrap.min.css";
import {Navbar, Nav} from "react-bootstrap";

class App extends Component {

    render() {
        return (
            <Router>
                <div className="text-center">
                    <Navbar bg="dark" variant="dark">
                        <Nav className="m-auto">
                            <Nav.Item>
                                <Link  to="/alice">Alice</Link>
                            </Nav.Item>
                            <Nav.Item  className="ml-3" >
                                <Link to="/bob">Bob</Link>
                            </Nav.Item>
                        </Nav>
                    </Navbar>
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
