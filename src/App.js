import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";


import main from './main'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {}
    render() {
        return (
            <div className="App">
                <Router>
                    <Route path="/home/page/:page" exact component={main}/>
                </Router>
            </div>
        )
    }
}

export default App