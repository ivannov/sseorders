import React, { Component } from 'react';
import axios from "axios";

class Contractor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orders: []
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
            <div>
                <button onClick={this.getOrdersForContractor.bind(this, this.props.name)}>
                    {this.props.name}'s orders
                </button>
                <table>
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
                </table>
            </div>
        )
    }
}

export default Contractor;
