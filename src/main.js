import React, {Component} from 'react';
import get from './fetchfun'
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            entries: [],
            current: this.props.match.params.page || 1,
            total: 0,
            hash: 1
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
    render() {
        return (
            <div className="main">
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
                                  <Link to={"/home/"+x._id}><Button variant="primary">Read the articel</Button></Link>
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