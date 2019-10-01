import React, {Component} from 'react';
import logo from './logo.svg';
import ListGroup from 'react-bootstrap/ListGroup'

import './App.css';

class cart extends Component {
    constructor(props) {
        super(props);
        this.state = {cart:[]}
    }
    componentDidMount(){
        let cart = localStorage.getItem("cart")
        let cartstr = JSON.parse(cart)
        this.setState({cart:cartstr})
        console.log(cartstr)
    }
    render() {
        return (
            <div className="App">
                <ListGroup variant="flush">
                {this.state.cart.map((x)=><>
                    <ListGroup.Item>{x.des}</ListGroup.Item><p>amount {x.amount}</p>
                    </>
                )}
                </ListGroup>
            </div>
        )
    }
}

export default cart