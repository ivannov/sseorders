import React, {Component} from 'react';
import Container from "react-bootstrap/Container";
import Contractor from './Contractor'
import Col from "react-bootstrap/Col";

class App extends Component {

    render() {
        return (
            <Container className="p-3">
                <h1 className="header">Latest orders</h1>
                <Col>
                    <Contractor name='Alice'/>
                </Col>
                <Col>
                    <Contractor name='Bob'/>
                </Col>
            </Container>
        )
    }
}

export default App;
