import React, { Component } from 'react';
import axios from "axios";
import {Table} from "react-bootstrap";

class Contractor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orders: []
        }
    }

    componentDidMount() {
        const eventSource = new EventSource("http://localhost:8080/order/stream");
        eventSource.onmessage = event => {
            const newOrder = JSON.parse(event.data);
            this.setState({orders: [newOrder, ...this.state.orders]})
        }
    }

    getOrdersForContractor(name) {
        axios.get('http://localhost:8080/order',
            {params: {contractor: name}}
        )
            .then(response => this.setState({orders: response.data}))
    }

    render() {
        return (
            <div className="w-50 m-auto">
                <button className="btn btn-primary m-2" onClick={this.getOrdersForContractor.bind(this, this.props.name)}>
                    {this.props.name}'s orders
                </button>
                <Table striped bordered>
                    <thead>
                    <tr>
                        <th>Task</th>
                        <th>Amount</th>
                        <th>Timestamp</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.orders.map(order =>
                            <tr key={order.id}>
                                <td>{order.taskName}</td>
                                <td>{order.amount}</td>
                                <td>{order.timestamp}</td>
                            </tr>
                        )
                    }
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default Contractor;
