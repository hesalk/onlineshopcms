import React, {Component} from 'react';
import get from './fetchfun'
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

class main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            entries: [],
            current: this.props.match.params.page || 1,
            total: 0,
            hash: 1,
            filter:{},
            search:""
        }
    }
    componentDidMount() {
        console.log("ss")
        get('https://hesh.devspace.host/api/collections/get/products', null, 3, 3 * (this.props.match.params.page - 1)).then((res) => {
            console.log(res)
            this.setState({entries: res.entries, total: res.total})
            console.log(this.state.entries)
        })
    }
    componentDidUpdate(prevProps, nextState) {
        if (prevProps.match.params.page !== this.props.match.params.page) {
            get('https://hesh.devspace.host/api/collections/get/products', null, 3, 3 * (this.props.match.params.page - 1)).then((res) => {
            console.log(res)
            this.setState({entries: res.entries, total: res.total})
            console.log(this.state.entries)
        })
        }
    }
    oncheck = (e)=>{
        console.log(e.target.checked)
        if(e.target.checked){
            get('https://hesh.devspace.host/api/collections/get/products', {instock:true}, 3, 3 * (this.props.match.params.page - 1)).then((res) => {
                console.log(res)
                this.setState({entries: res.entries, total: res.total})
                console.log(this.state.entries)
            })
        }
        else {
            get('https://hesh.devspace.host/api/collections/get/products', null, 3, 3 * (this.props.match.params.page - 1)).then((res) => {
            console.log(res)
            this.setState({entries: res.entries, total: res.total})
            console.log(this.state.entries)
        })
        }
    }
    onChange = (page) => {
        this.props.history.push("/home/page/" + page);
        this.setState({
          current: page,
        });
        let range = (page-1)*3
        console.log(range)
        get('https://hesh.devspace.host/api/collections/get/products',null,3,range)
        .then((res) => {
            console.log(res)
            this.setState({entries: res.entries, total: res.total})
        })
      }
      press = (e)=>{
        let code = e.keycode || e.which;
        console.log(code)
        console.log(this.state.search)
        if (code === 13){
            get('https://hesh.devspace.host/api/collections/get/products', {name:this.state.search}, 3, 3 * (this.props.match.params.page - 1)).then((res) => {
                console.log(res)
                this.setState({entries: res.entries, total: res.total})
                console.log(this.state.entries)
            })
        }
        if(this.state.search === ""){
            console.log("wtf")
        }
      }
      clear = ()=>{
        this.setState({search:""})
        get('https://hesh.devspace.host/api/collections/get/products', null, 3, 3 * (this.props.match.params.page - 1)).then((res) => {
            console.log(res)
            this.setState({entries: res.entries, total: res.total})
            console.log(this.state.entries)
        })
      }
    render() {
        return (
            <div className="main">
                    <Form.Check type="checkbox" label="show in stock only" onChange={this.oncheck} />
                    <Form.Control size="lg" value={this.state.search} type="text" onKeyPress={this.press} placeholder="Search for a product by name" onChange={(e)=>{this.setState({search:e.target.value})}}/>
                    <Button variant="warning" onClick={this.clear}>clear</Button>
                <Container>
  <Row>
            {this.state.entries.map((x,i)=>
                            <Col>
                                <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={"https://hesh.devspace.host" + x.images[1].path} />
                                <Card.Body>
                                  <Card.Title>{x.name}</Card.Title>
                                  <Card.Text>
                                     
                                     
                                  </Card.Text>
                                  <Link to={"/home/"+x._id}><Button variant="primary">See the product</Button></Link>
                                </Card.Body>
                              </Card>
                            </Col>
            )}
  </Row>
</Container>                

                <Pagination
                    onChange={this.onChange}
                    current={parseInt(this.props.match.params.page)}
                    total={this.state.total}
                    defaultPageSize={3}/>

            </div>
        )
    }
}

export default main