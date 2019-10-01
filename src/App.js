import React, {Component} from 'react';
import './App.css';
import Button from 'react-bootstrap/Button'

import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import get from './fetchfun'

import cart from './cart'
import propage from './productpage'
import main from './main'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {

    }
    render() {
        return (
            <div className="App">
                <Router>
                <Link to={"/cart"}> <Button variant="success">Go to cart</Button></Link>

                    <Route path="/home/page/:page" exact component={main}/>
                    <Route path="/home/:id" exact component={propage} />
                    <Route path="/cart" exact component={cart}/>
                </Router>
            </div>
        )
    }
}

export default App