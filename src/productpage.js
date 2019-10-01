import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import get from './fetchfun'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'


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
            ]
        }
        this.add = this.add.bind(this)
        this.id = props.match.params.id
    }
    componentDidMount() {
        get('https://hesh.devspace.host/api/collections/get/products', {
            _id: this.id
        }, 1, 0).then((res) => {
            console.log(res)
            this.setState({entries: res.entries[0], total: res.total, images: res.entries[0].images})
            console.log(this.state.entries)
            console.log(this.state.images)
        })
        get("https://hesh.devspace.host/api/collections/get/reviews",null, 10, 0).then((d) => {
            console.log(d)
            //this.setState({entries: res.entries[0], total: res.total, images: res.entries[0].images})
            //console.log(this.state.entries)
            //console.log(this.state.images)
        })
    }
    add = (e)=>{
        let data = [{
            name:this.state.entries._id,
            amount:1,
            des:this.state.entries.name
        }]
        let dd = JSON.stringify(data)
        if(localStorage.getItem("cart") === null){
        localStorage.setItem("cart",dd)
    } else {
        let p = JSON.parse(localStorage.getItem("cart"))
        let test = p.find(o => o.name === this.state.entries._id)
        let index = p.indexOf(test)
        console.log(index)
        if(test){
            console.log("ok")
            p.splice(index,1)
            console.log(p)
            console.log(test)
            test.amount = test.amount+1
            console.log(test)
            p.push(test)
            console.log(p)
            let str = JSON.stringify(p)
            localStorage.removeItem("cart")
            localStorage.setItem("cart",str)
    }else{
        console.log("not")
        p.push(data[0])
        console.log(p)
        let str = JSON.stringify(p)
        localStorage.removeItem("cart")
        localStorage.setItem("cart",str)
    }

    }
    }
    render() {
        return (
            <div className="propage">

                <Card style={{
                    width: '28rem'
                }}>
                    <Card.Img
                        variant="top"
                        src={"https://hesh.devspace.host" + this.state.images[0].path}/>
                    <Container>
                        <Row>
                            {this.state.images.map((x)=>
                                <Col xs={6} md={4}>
                                <Image src={"https://hesh.devspace.host"+x.path} thumbnail />
                            </Col>
                            )}
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
            </div>
        )
    }
}

export default prodpage