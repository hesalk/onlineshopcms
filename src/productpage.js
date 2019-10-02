import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import get from './fetchfun'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import ListGroup from 'react-bootstrap/ListGroup'
import Stars from 'simple-rating-stars';
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import FormCheck from 'react-bootstrap/FormCheck'
import post from './post'

class prodpage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            entries: {},
            total: "",
            images: [
                {
                    path: ""
                }
            ],
            reviews: []
        }
        this.add = this
            .add
            .bind(this)
        this.id = props.match.params.id
    }
    componentDidMount() {
        get('https://hesh.devspace.host/api/collections/get/products', {
            _id: this.id
        }, 1, 0).then((res) => {
            console.log(res)
            this.setState({entries: res.entries[0], total: res.total, images: res.entries[0].images})
            console.log(this.state.entries)
        })
        get("https://hesh.devspace.host/api/collections/get/reviews", null, 10, 0).then((d) => {
            this.setState({reviews: d.entries})
            console.log(this.state.entries)
            console.log(this.state.reviews);
            let revarr = []
            for (let i = 0; i < this.state.reviews.length; i++) { //bad code but the filter api is not working
                const element = this.state.reviews[i];
                console.log(element.product._id);
                if (element.product._id === this.state.entries._id) {
                    console.log("revavli")
                    revarr.push(element)
                }
            }
            this.setState({reviews: revarr})
            console.log(this.state.reviews)
        })
    }
    add = (e) => {
        let data = [
            {
                name: this.state.entries._id,
                amount: 1,
                des: this.state.entries.name
            }
        ]
        let dd = JSON.stringify(data)
        if (localStorage.getItem("cart") === null) {
            localStorage.setItem("cart", dd)
        } else {
            let p = JSON.parse(localStorage.getItem("cart"))
            let test = p.find(o => o.name === this.state.entries._id)
            let index = p.indexOf(test)
            console.log(index)
            if (test) {
                console.log("ok")
                p.splice(index, 1)
                console.log(p)
                console.log(test)
                test.amount = test.amount + 1
                console.log(test)
                p.push(test)
                console.log(p)
                let str = JSON.stringify(p)
                localStorage.removeItem("cart")
                localStorage.setItem("cart", str)
            } else {
                console.log("not")
                p.push(data[0])
                console.log(p)
                let str = JSON.stringify(p)
                localStorage.removeItem("cart")
                localStorage.setItem("cart", str)
            }

        }
    }
    submit = (e) => {
        console.log(e)
        console.log(e.target[2].value)
        let data = {
            titel:e.target[0].value,
            body:e.target[1].value,
            product:{
                display:this.state.entries.name,
                link:"products",
                _id:this.state.entries._id
            },
            rating:e.target[2].value
        }
        post(data,"https://hesh.devspace.host/api/collections/save/reviews")
        .then((res)=>{
            console.log(res)
        })        
    }
    render() {
        return (
            <div className="propage">
                <Container>
                    <Row>
                        <Col>
                            <Card
                                style={{
                                width: '28rem'
                            }}>
                                <Card.Img
                                    variant="top"
                                    src={"https://hesh.devspace.host" + this.state.images[0].path}/>
                                <Container>
                                    <Row>
                                        {this
                                            .state
                                            .images
                                            .map((x) => <Col xs={6} md={4}>
                                                <Image src={"https://hesh.devspace.host" + x.path} thumbnail/>
                                            </Col>)}
                                    </Row>
                                </Container>
                                <Card.Body>
                                    <Card.Title>{this.state.entries.name}</Card.Title>
                                    <Card.Text>
                                        {this.state.entries.description}
                                    </Card.Text>
                                    <Button variant="primary" onClick={this.add}>Add to cart</Button>
                                </Card.Body>

                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <Card.Title>Reviews</Card.Title>
                                <ListGroup>
                                    {this
                                        .state
                                        .reviews
                                        .map((x) => <ListGroup.Item>
                                            <h5>{x.titel}</h5>
                                            <p>{x.body}</p>
                                            <Stars stars={x.rating} outOf={5}/>
                                        </ListGroup.Item>)}
                                </ListGroup>
                            </Card>
                            <Card>
                                <Card.Title>Submit your review here</Card.Title>
                                <Form onSubmit={this.submit}>
                                    <Form.Group controlId="formGridAddress1">
                                        <Form.Label>title</Form.Label>
                                        <Form.Control placeholder="1234 Main St"/>
                                    </Form.Group>
                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Example textarea</Form.Label>
                                        <Form.Control as="textarea" rows="3"/>
                                    </Form.Group>

                                    <Form.Row>
             
                                        <Form.Group as={Col} controlId="formGridState">
                                            <Form.Label>Rate</Form.Label>
                                            <Form.Control as="select">
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </Form.Control>
                                        </Form.Group>

                                    </Form.Row>

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

export default prodpage