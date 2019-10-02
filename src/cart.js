import React, {Component} from 'react';
import logo from './logo.svg';
import ListGroup from 'react-bootstrap/ListGroup'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import FormCheck from 'react-bootstrap/FormCheck'
import post from './post'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import './App.css';

class cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: []
        }
    }
    componentDidMount() {
        let cart = localStorage.getItem("cart")
        let cartstr = JSON.parse(cart)
        this.setState({cart: cartstr})
        console.log(cartstr)
    }
    submit = (e) => {
        console.log(e)
        console.log(this.state.cart)
        let data = {
            name:e.target[0].value,
            address:e.target[1].value,
            email:e.target[2].value,
            list:this.state.cart
        }
        post(data,"https://hesh.devspace.host/api/collections/save/orders")
        e.preventDefault();

    }
    render() {
        return (
            <div className="App">
                <Container>
                    <Row>
                        <Col>
                            <ListGroup variant="flush">
                                {this
                                    .state
                                    .cart
                                    .map((x) => <> <ListGroup.Item>{x.des}</ListGroup.Item> < p > amount {x.amount} </p>
                                </ >)}
                            </ListGroup>
                        </Col>
                        <Col>
                            <Card>
                                <Card.Title>Make your order here</Card.Title>
                                <Form onSubmit={this.submit}>
                                    <Form.Group controlId="formGridAddress1">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control required placeholder="Name"/>
                                    </Form.Group>
                                    <Form.Group controlId="formGridAddress1">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control required placeholder="1234 Main St"/>
                                    </Form.Group>
                                    <Form.Group controlId="exampleForm.ControlInput1">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control required type="email" placeholder="name@example.com"/>
                                    </Form.Group>
                                    <Form.Group id="formGridCheckbox">
                                        <Form.Check type="checkbox" label="I Agree on every thing"/>
                                    </Form.Group>

                                    <Button variant="primary" type="submit">
                                        Submit
                                    </Button>
                                </Form>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default cart